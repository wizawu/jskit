"use strict";
exports.__esModule = true;
var generate = require("nanoid/generate");
function default_1(length) {
    if (length === void 0) { length = 20; }
    return generate("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", length);
}
exports["default"] = default_1;
