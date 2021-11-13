import { Request } from 'express';

class RegisterController {
    signup(req: Request) {
        let mobileNumber = req.query.mobileNumber as String
        let firstName = req.query.firstName as String
        let lastName = req.query.lastName as String
        let password = req.query.password as String

        if (mobileNumber == null) {
            return { text: "Mobile number required" }
        }

        if (firstName == null || firstName.length < 3) {
            return {text: "please enter valid first name"}
        }

        if (password == null || firstName.length < 5) {
            return {text: "password should be valid, minimum 5 characters"}
        }
        
        //todo: 
    }
}

export = new RegisterController();