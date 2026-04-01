export class APIClient {

    constructor(request) {

        this.request = request;
    }

    async get(url) {
        const response = await this.request.get(url)
        return response;
    }
    async post(url, body) {
        const response = await this.request.post(url, { data: body });
        return response;
    }
    async put(url, body) {
        const response = await this.request.put(url, { data: body });
        return response;
    }
    async delete(url) {
        const response = await this.request.delete(url);
        return response;
    }

}