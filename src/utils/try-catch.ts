export async function tryCatch<T>(
    promise: Promise<T>,
): Promise<[T | null, unknown | null]> {
    try {
        return [await promise, null];
    } catch (err) {
        return [null, err];
    }
}

export async function tryCatchFetch<T>(
    promise: Promise<Response>,
    isJson = true,
): Promise<[T | null, unknown | null]> {
    try {
        const response = await promise;

        if (!response || (response as unknown as Response).ok === false) {
            throw new Error(
                `Fetch error: ${
                    (response as unknown as Response).statusText ||
                    "Unknown error"
                }`,
            );
        }
        if (!isJson) {
            return [response as unknown as T, null];
        }

        const payload = (await (response as unknown as Response).json()) as T;
        return [payload, null];
    } catch (err) {
        return [null, err];
    }
}
