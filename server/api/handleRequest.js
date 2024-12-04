import { defineEventHandler, readBody, getQuery } from "h3";

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig();

    let url, options;

    // Handle GET requests with query parameters
    if (event.node.req.method === "GET") {
        const query = getQuery(event); // Extract query parameters
        url = query.url; // URL is passed as a query parameter
        options = {}; // No additional options for GET requests
    } else {
        // Handle non-GET requests with body
        const body = await readBody(event);
        url = body.url;
        options = body.options || {};
    }

    if (!url) {
        throw createError({
            statusCode: 400,
            message: "The 'url' parameter is required.",
        });
    }

    const backendUrl = `${runtimeConfig.public.backBaseUrl}${url}`; // Use backend base URL

    try {
        const response = await $fetch.raw(backendUrl, {
            ...options,
        });

        event.res.statusCode = response.status;
        return response._data; // Return the raw response data
    } catch (error) {
        // Handle errors and set appropriate status code
        event.res.statusCode = error?.response?.status || 500;
        return error?.data || { message: "An unexpected error occurred." };
    }
});
