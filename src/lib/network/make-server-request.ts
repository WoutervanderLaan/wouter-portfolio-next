"use server";

import { cookies } from "next/headers";
import makeRequest, {
    ErrorResponse,
    SuccessResponse,
    TMakeRequest,
} from "./make-request";

const makeServerRequest = async <T = unknown, E = unknown>(
    props: TMakeRequest,
): Promise<SuccessResponse<T> | ErrorResponse<E>> => {
    const cookieStore = await cookies();

    let token = cookieStore.get("access_token")?.value;

    if (!token) {
        const refreshToken = cookieStore.get("refresh_token")?.value;

        const response = await makeRequest<{ access_token: string }, unknown>({
            endpoint: "/auth/refresh",
            method: "GET",
            headers: {
                Cookie: `refresh_token=${refreshToken}`,
            },
        });

        if (response.data) token = response.data.access_token;
    }

    return makeRequest<T, E>({
        ...props,
        headers: { ...props.headers, Authorization: `Bearer ${token}` },
    });
};

export default makeServerRequest;
