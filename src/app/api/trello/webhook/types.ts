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

export type TrelloCardDetails = {
    id: string;
    badges: {
        attachments: number;
        fogbugz: string;
        checkItems: number;
        checkItemsChecked: number;
        comments: number;
        description: true;
        due: string | null;
        dueComplete: boolean;
        lastUpdatedByAi: boolean;
        start: string | null;
        attachmentsByType: {
            trello: {
                board: number;
                card: number;
            };
        };
        location: boolean;
        votes: number;
        maliciousAttachments: number;
        viewingMemberVoted: boolean;
        subscribed: boolean;
    };
    checkItemStates: string[];
    closed: boolean;
    dueComplete: boolean;
    dateLastActivity: string;
    desc: string;
    descData: {
        emoji: object;
    };
    due: string | null;
    dueReminder: string | null;
    idBoard: string;
    idChecklists: { id: string }[];
    idList: string;
    idMembers: string[];
    idMembersVoted: string[];
    idShort: number;
    idAttachmentCover: string | null;
    labels: Array<
        | string
        | {
              id: string;
              idBoard: string;
              idOrganization: string;
              name: string;
              nodeId: string;
              color: string;
              uses: number;
          }
    >;
    idLabels: Array<
        | string
        | {
              id: string;
              idBoard: string;
              name: string | null;
              color: string | null;
          }
    >;
    manualCoverAttachment: boolean;
    name: string;
    nodeId: string;
    pinned: boolean;
    pos: number;
    shortLink: string;
    shortUrl: string;
    start: string | null;
    subscribed: boolean;
    url: string;
    cover: {
        idAttachment: string | null;
        color: string | null;
        idUploadedBackground: string | null;
        size: string;
        brightness: string;
        yPosition: number;
    };
    isTemplate: boolean;
    cardRole: string | null;
    mirrorSourceId: string | null;
};

export type TrelloList = {
    id: string;
    name: string;
    closed: boolean;
    color: string | null;
    idBoard: string;
    pos: number;
    subscribed: boolean;
    softLimit: string | null;
    type: string | null;
    datasource: {
        filter: boolean;
    };
};

export enum TRELLO_LISTS {
    BACKLOG = "Backlog",
    IN_PROGRESS = "In Progress",
    READY_FOR_AGENTS = "🟢 Ready for Agents",
    IN_REVIEW = "In Review",
    DONE = "Done",
}
