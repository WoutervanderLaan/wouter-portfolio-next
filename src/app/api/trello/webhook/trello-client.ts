import { tryCatchFetch } from "@/utils/try-catch";
import {
    TRELLO_LISTS,
    TrelloCardDetails,
    TrelloList,
    TrelloWebhookPayload,
} from "./types";

/**
 * Trello API Client
 * Handles requests to Trello API
 */
export class TrelloClient {
    private readonly baseUrl = "https://api.trello.com/1";
    private readonly cardId: string | null;
    private readonly model: TrelloWebhookPayload["model"];
    private readonly defaultParams: URLSearchParams;

    constructor(cardId: string | null, model: TrelloWebhookPayload["model"]) {
        this.cardId = cardId;
        this.model = model;

        this.defaultParams = new URLSearchParams({
            key: process.env.TRELLO_API_KEY!,
            token: process.env.TRELLO_TOKEN!,
        });
    }

    /**
     *  Utility to merge default params with custom ones
     * @param extra Extra params to add
     * @returns
     */
    private params(extra?: Record<string, string>) {
        const p = new URLSearchParams(this.defaultParams.toString());
        if (extra) {
            Object.entries(extra).forEach(([k, v]) => p.append(k, v));
        }
        return p;
    }

    /**
     * Make a request to Trello API
     * @param path API path
     * @param extraParams Extra query params
     * @param init Fetch init options
     * @returns
     */
    private async request<T>(
        path: string,
        extraParams?: Record<string, string>,
        init?: RequestInit,
    ) {
        const url = `${this.baseUrl}${path}?${this.params(extraParams).toString()}`;

        const [response, error] = await tryCatchFetch<T>(fetch(url, init));

        if (error || !response) {
            console.error("Trello API request error for url", url, init);
            console.error("Error details:", error);
            throw new Error(`Trello API request to ${path} failed: ${error}`);
        }

        return response;
    }
    /**
     * Get details of the card
     * @returns TrelloCardDetails
     */
    async getCardDetails(): Promise<TrelloCardDetails> {
        if (!this.cardId) throw new Error("Card ID missing");

        return this.request<TrelloCardDetails>(`/cards/${this.cardId}`);
    }

    /**
     * Get all lists of the board
     * @returns TrelloList[]
     */
    async getLists(): Promise<TrelloList[]> {
        const boardId = this.model?.id;

        if (!boardId) throw new Error("Board ID missing from webhook model");

        return this.request<TrelloList[]>(`/boards/${boardId}/lists`);
    }

    /**
     * Move card to specified list
     * @param listName Name of the list to move the card to
     * @returns
     */
    async moveCard(listName: TRELLO_LISTS) {
        if (!this.cardId) throw new Error("Card ID missing");

        const boardId = this.model?.id;

        if (!boardId) throw new Error("Board ID missing from webhook model");

        const lists = await this.getLists();

        const target = lists.find(
            (l: TrelloList) => l.name.toLowerCase() === listName.toLowerCase(),
        );

        if (!target) {
            throw new Error(`List "${listName}" not found on board`);
        }

        return this.request(
            `/cards/${this.cardId}`,
            { idList: target.id },
            { method: "PUT" },
        );
    }

    /**
     * Add comment to the card
     * @param text Comment text
     * @returns
     */
    async addComment(text: string) {
        if (!this.cardId) throw new Error("Card ID missing");

        return this.request(
            `/cards/${this.cardId}/actions/comments`,
            { text },
            { method: "POST" },
        );
    }
}
