"use strict";
const BaseResponseModel_1 = require("../model/BaseResponseModel");
const JwtJob_1 = require("../job/JwtJob");
class AccountController {
    withdraw(req, response) {
        (0, JwtJob_1.verify)(req, response, (success, result) => {
            if (!success) {
                return;
            }
            response.json(new BaseResponseModel_1.BaseResponseModel("returning a account", 1, null));
        });
    }
}
module.exports = new AccountController();
