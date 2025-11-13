export type TrelloWebhookPayload = {
    model: {
        id: string;
        name: string;
        desc: string;
        descData: null | object;
        closed: boolean;
        idOrganization: string;
        idEnterprise: null | string;
        pinned: boolean;
        url: string;
        shortUrl: string;
        labelNames: {
            [key: string]: string;
        };
    };
    webhook: {
        id: string;
        description: string;
        idModel: string;
        callbackURL: string;
        active: boolean;
        consecutiveFailures: number;
        firstConsecutiveFailDate: string;
    };
    action: {
        id: string;
        idMemberCreator: string;
        appCreator: null | object;
        type: string;
        date: string;
        data: {
            board: {
                id: string;
                name: string;
            };
            card: {
                idShort: number;
                id: string;
                name: string;
                desc: string;
            };
            listBefore?: {
                id: string;
                name: string;
            };
            listAfter?: {
                id: string;
                name: string;
            };
        };
    };
};
