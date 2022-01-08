export class UserModel {
    uid: string = "";
    status: number = 0;
    userName: string = ""
    firstName: string = "";
    lastName: string = "";
    mobileNumber: string = "";

    constructor(result: any) {
        this.uid = result.uid;
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.status = result.status;
        this.mobileNumber = result.mobileNumber;
        this.userName = result.userName;
    }

    getJson() {
        return JSON.parse(JSON.stringify(this))
    }
}