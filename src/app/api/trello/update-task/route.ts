import { TrelloClient } from "../../../../../server/trello-client";
import { TrelloLists } from "../../../../../server/types";

type RequestBody = {
    status: "error" | "done" | "review";
    cardId: string;
    modelId: string;
    comment?: string;
};

const getList = (
    status: "error" | "done" | "review",
): TrelloLists | undefined => {
    if (status === "done") {
        return TrelloLists.DONE;
    }
    if (status === "error") {
        return TrelloLists.BACKLOG;
    }

    if (status === "review") {
        return TrelloLists.IN_REVIEW;
    }
};

export async function POST(req: Request) {
    const { status, cardId, modelId, comment }: RequestBody = await req.json();
    const toList = getList(status);

    if (!status || !toList || !cardId || !modelId) {
        return new Response("Invalid request. Missing data.", { status: 404 });
    }

    const trello = new TrelloClient(cardId, modelId);

    try {
        await trello.moveCard(toList);

        if (comment) {
            await trello.addComment(comment);
        }

        return new Response("Card updated successfully.", { status: 200 });
    } catch (error) {
        console.error("Failed to process update:", error);
        return new Response("Something went wrong.", { status: 500 });
    }
}
