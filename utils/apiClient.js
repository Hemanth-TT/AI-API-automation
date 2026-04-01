export class APIClient{

constructor(request) {

    this.request = request;
}

    async get(url) {
        const response = await this.request.get(url)
        return response;
    }
    async post(url, data){
        const response = await this.request.post(url , {
            data:data
        });
        return response;
    }


}