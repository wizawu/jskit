"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNode() {
    return typeof window === "undefined" || typeof navigator === "undefined";
}
exports.isNode = isNode;
function cssSupports(property, values) {
    if (isNode())
        return values[values.length - 1];
    var value = values[0];
    values.forEach(function (v) {
        var span = document.createElement("span");
        span.style[property] = v;
        if (span.style[property] === v)
            value = v;
    });
    return value;
}
exports.cssSupports = cssSupports;
