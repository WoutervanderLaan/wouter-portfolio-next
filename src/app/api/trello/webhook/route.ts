import { GithubClient } from "../../../../../server/github-client";
import { TrelloClient } from "../../../../../server/trello-client";
import { TrelloLists, TrelloWebhookPayload } from "../../../../../server/types";
import { verifyTrelloSignature } from "../../../../../server/utils";

export async function GET() {
    return new Response("OK", { status: 200 });
}

export async function HEAD() {
    return new Response(null, { status: 200 });
}

/**
 *
 * @param req
 * Webhook endpoint to process trello board changes
 * 1. Checks signatures
 * 2. Checks if trello card was moved to relevant list ('🟢 Ready for Agents')
 * 3. If so, fetches card and board details
 * 4. Moves card to 'In Progress'
 * 5. Triggers GitHub Actions workflow with card details
 * 6. If any step fails, logs error and moved card to 'Backlog', adding comment with error details
 * @returns
 */
export async function POST(req: Request) {
    const rawBody = await req.text();
    const signature = req.headers.get("x-trello-webhook");

    if (!signature) {
        return new Response("Missing Trello signature", { status: 400 });
    }

    const isValid = verifyTrelloSignature(rawBody, signature ?? "");

    if (!isValid) {
        return new Response("Invalid Trello signature", { status: 403 });
    }

    const payload: TrelloWebhookPayload = JSON.parse(rawBody);
    console.log("Trello payload received");

    const model = payload.model;
    const card = payload.action?.data?.card;
    const listAfter = payload.action?.data?.listAfter?.name;

    if (listAfter === "🟢 Ready for Agents") {
        console.log('Card moved to "Ready for Agents", processing...');

        const trello = new TrelloClient(card?.id, model.id);
        const github = new GithubClient(model);

        try {
            const cardDetails = await trello.getCardDetails();

            console.log("Processing task:", {
                trelloCardId: cardDetails.id,
                title: cardDetails.name || "No Title",
                description: cardDetails.desc || "No Description",
            });

            console.log("Triggering GitHub Actions workflow...");

            await github.triggerWorkflow({
                trelloCardId: cardDetails.id,
                title: cardDetails.name || "No Title",
                description: cardDetails.desc || "No Description",
            });

            console.log("GitHub Actions workflow triggered successfully.");

            await trello.moveCard(TrelloLists.IN_PROGRESS);
            await trello.addComment(
                `🚀 Task processing started by GitHub Actions workflow.`,
            );

            return new Response(
                JSON.stringify({
                    status: 200,
                    ok: true,
                    detail: "Workflow triggered successfully",
                }),
                {
                    headers: { "Content-Type": "application/json" },
                },
            );
        } catch (error) {
            console.error("Error processing trello request", error);

            try {
                await trello.moveCard(TrelloLists.BACKLOG);
                await trello.addComment(
                    `⚠️ An error occurred while processing this card: ${error}`,
                );
            } catch (moveError) {
                console.error(
                    "Additionally, failed to move card to Backlog:",
                    moveError,
                );
            }

            return new Response(
                JSON.stringify({
                    status: 500,
                    ok: false,
                    detail: error,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                },
            );
        }
    }

    console.log("Card moved to irrelevant list, no action taken.");

    return new Response("OK", { status: 200 });
}
