import { TrelloWebhookPayload } from "./types";
import { verifyTrelloSignature } from "./utils";

const TRELLO_SECRET = process.env.TRELLO_SECRET!;
const TRELLO_CALLBACK_URL = process.env.TRELLO_CALLBACK_URL!;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;

export async function GET() {
    return new Response("OK", { status: 200 });
}

export async function HEAD() {
    return new Response(null, { status: 200 });
}

export async function POST(req: Request) {
    const rawBody = await req.text();

    const signature = req.headers.get("x-trello-webhook");

    if (!signature) {
        return new Response("Missing Trello signature", { status: 400 });
    }

    const isValid = verifyTrelloSignature(
        rawBody,
        TRELLO_CALLBACK_URL,
        signature ?? "",
        TRELLO_SECRET,
    );

    if (!isValid) {
        return new Response("Invalid Trello signature", { status: 403 });
    }

    const payload: TrelloWebhookPayload = JSON.parse(rawBody);
    console.log("Trello payload received");

    const action = payload.action;
    const project = payload.model.name;
    const card = action?.data?.card;
    const listAfter = action?.data?.listAfter?.name;

    console.log("Project", project);
    console.log("Card", card);
    console.log("List after", listAfter);

    let task = "";

    if (listAfter === "🟢 Ready for Agents") {
        const title = card?.name ?? "";
        const description = card?.desc ?? "";
        const trelloCardId = card?.id ?? "";
        task = `Trello card (${trelloCardId}), Task: ${title}, \n\nDescription: ${description}`;
        console.log(task);

        try {
            console.log("Triggering GitHub Actions workflow...");
            await fetch(
                `https://api.github.com/repos/WoutervanderLaan/${project}/actions/workflows/ai-agent.yml/dispatches`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${GITHUB_TOKEN}`,
                        Accept: "application/vnd.github+json",
                    },
                    body: JSON.stringify({
                        ref: "main",
                        inputs: {
                            trelloCardId,
                            title,
                            description,
                        },
                    }),
                },
            );
            console.log("GitHub Actions workflow triggered successfully.");
        } catch (error) {
            console.error("Error triggering GitHub Actions workflow:", error);
        }
    }

    return new Response(JSON.stringify({ ok: true, task }), {
        headers: { "Content-Type": "application/json" },
    });
}
