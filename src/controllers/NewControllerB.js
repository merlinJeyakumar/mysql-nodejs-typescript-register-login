"use strict";
var NewControllerB = /** @class */ (function () {
    function NewControllerB() {
    }
    NewControllerB.prototype.defaultMethod = function () {
        return { text: 'you reached at NewControllerB' };
    };
    return NewControllerB;
}());
module.exports = new NewControllerB();
