import { Request } from "express";

class LoginController {
    defaultMethod() {
        return { text: "you reached a login" };
    }

    login(req: Request) {
        let id: String = req.query.id as String
        let password: String = req.query.password as String

        if (id == null) {
            return { text: "invalid login id" };
        }
        if (password == null) {
            return { text: "invalid login password" };
        }
        
        return { text: "you logged in with " + id };
    }
}

export = new LoginController();