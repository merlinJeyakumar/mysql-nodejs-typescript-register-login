export class BaseResponseModel {
    status: number = 200;
    success: number = 1;
    message: String = "success";
    result: any;

    constructor(message: String, success: number, status: number, result: any) {
        this.message = message;
        this.success = success
        this.status = status;
        this.result = result;
    }

    getJson(){
        return JSON.parse(JSON.stringify(this))
    }
}