import apiClient from "./api-client";

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    post(messages: { role: string; content: string; }[]) {
        const controller = new AbortController();
        const request = apiClient.post(this.endpoint, { params: {messages: messages}, signal: controller.signal });
        return { request, cancel: () => controller.abort() };
    }
}

const createResponseService = () => {
    return new HttpService("/response");
}

export { createResponseService};
