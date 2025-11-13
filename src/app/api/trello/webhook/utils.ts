import crypto from "node:crypto";

export const verifyTrelloSignature = (
    rawBody: string,
    callbackUrl: string,
    receivedSig: string,
    secret: string,
) => {
    const hmac = crypto.createHmac("sha1", secret);

    hmac.update(rawBody + callbackUrl, "utf8");

    const expected = hmac.digest("base64");

    const expectedBuf = Buffer.from(expected, "base64");
    const receivedBuf = Buffer.from(receivedSig, "base64");

    if (expectedBuf.length !== receivedBuf.length) {
        console.warn("Signature length mismatch");
        return false;
    }

    return crypto.timingSafeEqual(expectedBuf, receivedBuf);
};
