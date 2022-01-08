export class BaseResponseModel {
    status: number = 1;
    message: String = "success";
    result: any;
    auth:any

    constructor(message: String, status: number, result: any, auth: any) {
        this.message = message;
        this.status = status
        this.result = result;
        this.auth = auth
    }

    getJson() {
        return JSON.parse(JSON.stringify(this))
    }
}