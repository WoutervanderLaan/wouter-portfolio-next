import crypto from "node:crypto";

const TRELLO_SECRET = process.env.TRELLO_SECRET!;
const TRELLO_CALLBACK_URL = process.env.TRELLO_CALLBACK_URL!;

export const verifyTrelloSignature = (rawBody: string, receivedSig: string) => {
    const hmac = crypto.createHmac("sha1", TRELLO_SECRET);

    hmac.update(rawBody + TRELLO_CALLBACK_URL, "utf8");

    const expected = hmac.digest("base64");

    const expectedBuf = Buffer.from(expected, "base64");
    const receivedBuf = Buffer.from(receivedSig, "base64");

    if (expectedBuf.length !== receivedBuf.length) {
        console.warn("Signature length mismatch");
        return false;
    }

    return crypto.timingSafeEqual(expectedBuf, receivedBuf);
};
