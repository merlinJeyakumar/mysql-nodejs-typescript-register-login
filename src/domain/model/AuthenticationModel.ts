export class AuthenticationModel {
    accessToken: string = "";
    refreshToken: string = "";

    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }

    getJson() {
        return JSON.parse(JSON.stringify(this))
    }
}