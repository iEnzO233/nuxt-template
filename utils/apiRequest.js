import { useFetch } from "#app";
import { useCoreStore } from "~/stores/core";

/**
 * API Request Utility
 * @template T
 * @param {string} url - API endpoint or relative path.
 * @param {Object} options - UseFetch options.
 * @returns {Promise<{ data: T | null, error: any | null, refresh: Function }>}
 */
export async function apiRequest(url, options = {}) {
    const coreStore = useCoreStore(); // Access core store
    // Merge default headers
    const headers = {
        Accept: "application/json",
        Authorization: coreStore.getToken() ? `Bearer ${coreStore.getToken()}` : undefined,
        ...options.headers,
    };

    try {
        const { data, error, refresh } = await useFetch("/api/handleRequest", {
            ...options,
            method: options.method || "GET",
            headers,
            query: options.method === "GET" ? { url } : undefined, // Pass URL as query for GET
            body: options.method !== "GET" ? { url, options } : undefined, // Pass body for non-GET
        });

        if (error?.value) {
            handleGlobalError(error.value); // Handle errors
        }

        return { data: data.value, error: error.value, refresh };
    } catch (e) {
        handleGlobalError(e);
        return { data: null, error: e, refresh: () => {} };
    }
}


/**
 * Handle errors and update the core store's error state.
 * @param {any} error - The error object.
 */
function handleGlobalError(error) {
    const coreStore = useCoreStore();
    coreStore.errors = []
    const defaultErrorMessage = "An unexpected error occurred.";
    let errorMessages = [];

    // Check for specific errors in the backend response
    if (error?.data?.meta) {
        const meta = error.data.meta;

        if (meta?.errors && Object.keys(meta.errors).length > 0) {
            // Extract error messages from the errors object
            errorMessages = Object.values(meta.errors).flat();
        } else if (meta.message) {
            // If there's a single message in the meta, use it
            errorMessages = [meta.message];
        }
    }

    // If no specific errors were found, add a default error message
    if (errorMessages.length === 0) {
        errorMessages.push(defaultErrorMessage);
    }

    // Update the errors in the core store
    coreStore.errors = [...coreStore.errors, ...errorMessages];
}
