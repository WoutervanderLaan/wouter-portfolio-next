/**
 * Executes a Promise and rejects if it takes longer than the specified duration.
 * @param promise The Promise to execute.
 * @param durationMs The timeout duration in milliseconds.
 * @returns The resolved value of the original Promise.
 */
export const withTimeout = <T>(
    promise: Promise<T>,
    durationMs: number,
): Promise<T> => {
    const timeoutPromise = new Promise<T>((_, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new Error(`Operation timed out after ${durationMs}ms`));
        }, durationMs);

        promise.finally(() => {
            clearTimeout(timeoutId);
        });
    });

    return Promise.race([promise, timeoutPromise]);
};

/**
 * Executes a fetch request and aborts/rejects if it takes longer than the specified duration.
 * @param url The URL to fetch.
 * @param durationMs The timeout duration in milliseconds.
 * @param options Optional RequestInit options for the fetch request.
 * @returns The Response object from the fetch request.
 */
export const fetchWithTimeout = (
    url: string,
    durationMs: number,
    options?: RequestInit,
): Promise<Response> => {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, durationMs);

    const fetchPromise = fetch(url, {
        ...options,
        signal,
    }).finally(() => {
        clearTimeout(timeoutId);
    });

    return fetchPromise.catch((error) => {
        if (error.name === "AbortError") {
            throw new Error(`Fetch request timed out after ${durationMs}ms`);
        }
        throw error;
    });
};
