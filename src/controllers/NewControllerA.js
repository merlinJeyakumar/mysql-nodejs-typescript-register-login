"use strict";
var NewControllerA = /** @class */ (function () {
    function NewControllerA() {
    }
    NewControllerA.prototype.defaultMethod = function () {
        return { text: 'you reached at NewControllerA' };
    };
    return NewControllerA;
}());
module.exports = new NewControllerA();
