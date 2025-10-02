import crypto from "crypto";

const TRELLO_TOKEN = process.env.TRELLO_TOKEN!;
const TRELLO_CALLBACK_URL = process.env.TRELLO_CALLBACK_URL!;

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

    // const isValid = verifyTrelloSignature(
    //     rawBody,
    //     TRELLO_CALLBACK_URL,
    //     signature ?? "",
    //     TRELLO_TOKEN,
    // );

    const isValid = verifyTrelloWebhookRequest(
        req,
        TRELLO_TOKEN,
        TRELLO_CALLBACK_URL,
    );

    if (!isValid) {
        return new Response("Invalid Trello signature", { status: 403 });
    }

    const payload = JSON.parse(rawBody);

    const action = payload.action;
    const card = action?.data?.card;
    const listAfter = action?.data?.listAfter?.name;

    let task = "";

    if (listAfter === "🟢 Ready for Agents") {
        const title = card?.name ?? "";
        const desc = card?.desc ?? "";
        task = `Trello Task: ${title}, \n\nDescription: ${desc}`;
        console.log(task);
    }

    return new Response(JSON.stringify({ ok: true, task }), {
        headers: { "Content-Type": "application/json" },
    });
}

// function verifyTrelloSignature(
//     rawBody: string,
//     callbackUrl: string,
//     receivedSig: string,
//     secret: string,
// ) {
//     const hmac = crypto.createHmac("sha1", secret);

//     hmac.update(rawBody + callbackUrl, "utf8");

//     const expected = hmac.digest("base64");

//     const expectedBuf = Buffer.from(expected, "base64");
//     const receivedBuf = Buffer.from(receivedSig, "base64");

//     if (expectedBuf.length !== receivedBuf.length) {
//         console.warn("Signature length mismatch");
//         return false;
//     }
//     console.log("expected", expected);
//     console.log("received", receivedSig);
//     return crypto.timingSafeEqual(expectedBuf, receivedBuf);
// }

function verifyTrelloWebhookRequest(
    request: Request,
    secret: string,
    callbackURL: string,
) {
    const base64Digest = function (s: crypto.BinaryLike) {
        return crypto.createHmac("sha1", secret).update(s).digest("base64");
    };

    const content = JSON.stringify(request.body) + callbackURL;
    const expected = base64Digest(content);
    const received = request.headers.get("x-trello-webhook");
    console.log("expected2", expected);
    console.log("received2", received);
    return expected === received;
}
