"use server";

import { tryCatchFetch } from "@/utils/try-catch";
import { TrelloWebhookPayload } from "./types";

export class GithubClient {
    private readonly token: string;

    private readonly model: TrelloWebhookPayload["model"];

    constructor(model: TrelloWebhookPayload["model"]) {
        this.token = process.env.GITHUB_TOKEN!;
        this.model = model;
    }

    async triggerWorkflow(
        inputs: Record<string, string>,
        workflowId: string = "ai-agent",
    ) {
        const [res, error] = await tryCatchFetch<Response>(
            fetch(
                `https://api.github.com/repos/WoutervanderLaan/${this.model.name}/actions/workflows/${workflowId}.yml/dispatches`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        Accept: "application/vnd.github+json",
                    },
                    body: JSON.stringify({
                        ref: "main",
                        inputs,
                    }),
                },
            ),
            false,
        );

        if (error || !res?.ok) {
            console.error(
                `GitHub API responded with status ${res?.status}: ${error}`,
            );
            throw new Error(`GitHub API request failed: ${error}`);
        }
        return res.ok;
    }
}
