const isDevelopment = process.env.NODE_ENV === "development";

const authorizationHeader = () => localStorage.getItem('token')

async function makeRequest(method, url, { customHeaders, body, includeCredentials=true } = {}) {
    const authHeaders = isDevelopment ? { 'Authorization': "Bearer " + authorizationHeader() } : {}
    const res = await fetch(url, {
        credentials: includeCredentials ? "include" : "omit",
        headers: {
            "Content-Type": "application/json",
            ...customHeaders,
            ...authHeaders,
        },
        body: JSON.stringify(body),
        method: method
    });
    if (res.status.toString()[0] !== "2") {
        throw new Error("request rejected with code: ", res.status);
    }
    return await res.json();
}

const httpClient = {
    get: (url, { customHeaders, successResponse, includeCredentials } = {}) => {
        return makeRequest("GET", url, { customHeaders, successResponse, includeCredentials });
    },
    post: (url, { customHeaders, body, includeCredentials } = {}) => {
        return makeRequest("POST", url, { customHeaders, body, includeCredentials });
    },
    patch: (url, { customHeaders, body, includeCredentials } = {}) => {
        return makeRequest("PATCH", url, { customHeaders, body, includeCredentials });
    },
    put: (url, { customHeaders, body, includeCredentials } = {}) => {
        return makeRequest("PUT", url, { customHeaders, body, includeCredentials });
    },
    delete: (url, { customHeaders, body, includeCredentials } = {}) => {
        return makeRequest("DELETE", url, { customHeaders, body, includeCredentials });
    },
}

export default httpClient