class ApiHandler {
    constructor(baseURL) {
        this.service = axios.create({
            baseURL: baseURL,
        });
    }

    getAllByTag() {
        return this.service.get("/");
    }
};

export default ApiHandler;