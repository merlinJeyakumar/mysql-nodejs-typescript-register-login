export class BaseResponseModel {
    status: number = 1;
    message: String = "success";
    result: any;
    auth: any

    /*constructor(message: String, status: number, result: any, auth: any) {
        this.message = message;
        this.status = status
        this.result = result;
        this.auth = auth
    }*/

    getJson() {
        return JSON.parse(JSON.stringify(this))
    }

    public setStatus(status: number) {
        this.status = status
        return this
    }

    public setMessage(message: string) {
        this.message = message
        return this
    }

    public setResult(result: any) {
        this.result = result
        return this
    }

    public asSuccess(message: any | undefined = "success", status: number | undefined = 200) {
        this.message = message
        this.status = status
        return this
    }

    public asFailure(message: any | undefined = "failed", status: number | undefined = 200) {
        this.message = message
        this.status = status
        return this
    }

    public build() {
        return this
    }
}