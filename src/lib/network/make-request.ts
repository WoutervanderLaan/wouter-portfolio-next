type ENDPOINTS_GET =
    | "/auth/refresh"
    | "/history/"
    | "/session/retrieve"
    | "/session/reset";

type ENDPOINTS_POST = "/auth/login" | "/chat/image-critique" | "/chat/draw";

type ENDPOINTS_DELETE = "/auth/logout";

type TGetRequest = {
    endpoint: ENDPOINTS_GET;
    method: "GET";
    body?: never;
};

type TPostRequest = {
    endpoint: ENDPOINTS_POST;
    method: "POST";
    body: RequestInit["body"];
};

type TDeleteRequest = {
    endpoint: ENDPOINTS_DELETE;
    method: "DELETE";
    body?: never;
};

export type TMakeRequest = {
    headers?: {
        [key: string]: string;
    };
} & (TGetRequest | TPostRequest | TDeleteRequest);

export type SuccessResponse<T> = {
    status: number;
    data: T;
    error?: never;
};

export type ErrorResponse<E> = {
    status: number;
    data?: never;
    error: E;
};

/**
 * Makes an HTTP request to the specified endpoint and returns a typed response.
 *
 * @template T - The expected type of the successful response data.
 * @template E - The expected type of the error response data.
 * @param {TMakeRequest} params - The request parameters.
 * @param {string} params.endpoint - The API endpoint to send the request to.
 * @param {string} [params.method="GET"] - The HTTP method to use for the request.
 * @param {BodyInit} [params.body] - The request body, if applicable.
 * @param {Record<string, string>} [params.headers={}] - Additional headers to include in the request.
 * @returns {Promise<SuccessResponse<T> | ErrorResponse<E>>} A promise that resolves to either a success or error response, depending on the HTTP status code.
 */
export const makeRequest = async <T = unknown, E = unknown>({
    endpoint,
    method = "GET",
    body,
    headers = {},
}: TMakeRequest): Promise<SuccessResponse<T> | ErrorResponse<E>> => {
    const options: RequestInit = {
        method,
        mode: "cors",
        credentials: "include",
        headers: {
            Accept: "application/json",
            ...headers,
        },
        body,
    };

    try {
        const response = await fetch(
            `http://localhost:8000${endpoint}`,
            options,
        );

        const payload = await response.json();
        if (response.status !== 200) {
            return {
                status: response.status,
                error: payload,
            } as ErrorResponse<E>;
        }

        return { status: response.status, data: payload } as SuccessResponse<T>;
    } catch (error) {
        return { status: 500, error } as ErrorResponse<E>;
    }
};

export default makeRequest;
