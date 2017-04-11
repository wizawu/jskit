"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cssSupports(property, value) {
    var span = document.createElement("span");
    span.style[property] = value;
    return span.style[property.replace(/(-\w)/g, function (c) { return c.charAt(1).toUpperCase(); })] === value;
}
exports.cssSupports = cssSupports;
function mergeCSSProps(props) {
    var style = {};
    props.forEach(function (_a) {
        var prop = _a[0], value = _a[1];
        if (cssSupports(prop, value))
            style[prop] = value;
    });
    return style;
}
exports.mergeCSSProps = mergeCSSProps;
