export class AuthenticationModel {
    token: string = "";
    result: any;

    constructor(token: string, result: any) {
        this.token = token
        this.result = result
    }

    getJson() {
        return JSON.parse(JSON.stringify(this))
    }
}