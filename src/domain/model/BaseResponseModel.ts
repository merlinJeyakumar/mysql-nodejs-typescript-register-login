export class BaseResponseModel {
    success: number = 1;
    message: String = "success";
    result: any;

    constructor(message: String, success: number, result: any) {
        this.message = message;
        this.success = success
        this.result = result;
    }

    getJson() {
        return JSON.parse(JSON.stringify(this))
    }
}