"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cssSupports(property, value) {
    var span = document.createElement("span");
    span.style[property] = value;
    var key = property.replace(/(-\w)/g, function (c) { return c.charAt(1).toUpperCase(); });
    return span.style[key] === value ? key : "";
}
exports.cssSupports = cssSupports;
function mergeCSSProps(props) {
    var style = {};
    props.forEach(function (_a) {
        var prop = _a[0], value = _a[1];
        var key = cssSupports(prop, value);
        if (key)
            style[key] = value;
    });
    return style;
}
exports.mergeCSSProps = mergeCSSProps;
