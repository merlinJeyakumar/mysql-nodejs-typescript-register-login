import {BaseResponseModel} from "./BaseResponseModel";

export class UserModel {
    id: number = 0;
    status: number = 0;
    userName: String = ""
    firstName: String = "";
    lastName: String = "";
    mobileNumber: String = "";

    constructor(result: any) {
        this.id = result.id;
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.status = result.status;
        this.mobileNumber = result.mobileNumber;
        this.userName = result.userName;
    }

    getJson(){
        return JSON.parse(JSON.stringify(this))
    }
}