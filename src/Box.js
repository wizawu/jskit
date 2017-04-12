"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Item_1 = require("./Item");
var util_1 = require("./util");
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Box.prototype.render = function () {
        var props = this.props;
        var _a = this.props, wrap = _a.wrap, reverse = _a.reverse, horizontal = _a.horizontal, vertical = _a.vertical, center = _a.center, start = _a.start, end = _a.end, stretch = _a.stretch, startJustified = _a.startJustified, centerJustified = _a.centerJustified, endJustified = _a.endJustified, justified = _a.justified, aroundJustified = _a.aroundJustified, otherProps = __rest(_a, ["wrap", "reverse", "horizontal", "vertical", "center", "start", "end", "stretch", "startJustified", "centerJustified", "endJustified", "justified", "aroundJustified"]);
        var style = {};
        if (props.wrap) {
            style = __assign({}, style, util_1.mergeCSSProps([
                ["-webkit-flex-wrap", "wrap"],
                ["-ms-flex-wrap", "wrap"],
                ["flex-wrap", "wrap"],
            ]));
        }
        if (props.vertical) {
            style = __assign({}, style, util_1.mergeCSSProps([
                ["-webkit-box-orient", "vertical"],
                ["-webkit-box-direction", props.reverse ? "reverse" : "normal"],
                ["-webkit-flex-direction", props.reverse ? "column-reverse" : "column"],
                ["-ms-flex-direction", props.reverse ? "column-reverse" : "column"],
                ["flex-direction", props.reverse ? "column-reverse" : "column"],
            ]));
        }
        else {
            style = __assign({}, style, util_1.mergeCSSProps([
                ["-webkit-box-orient", "horizontal"],
                ["-webkit-box-direction", props.reverse ? "reverse" : "normal"],
                ["-webkit-flex-direction", props.reverse ? "row-reverse" : "row"],
                ["-ms-flex-direction", props.reverse ? "row-reverse" : "row"],
                ["flex-direction", props.reverse ? "row-reverse" : "row"],
            ]));
        }
        var alignItems = null;
        if (props.start) {
            alignItems = ["start", "flex-start", "start", "flex-start"];
        }
        else if (props.center) {
            alignItems = ["center", "center", "center", "center"];
        }
        else if (props.end) {
            alignItems = ["end", "flex-end", "end", "flex-end"];
        }
        else if (props.stretch) {
            alignItems = ["stretch", "stretch", "stretch", "stretch"];
        }
        style = alignItems ? __assign({}, style, util_1.mergeCSSProps([
            ["-webkit-box-align", alignItems[0]],
            ["-webkit-align-items", alignItems[1]],
            ["-ms-flex-align", alignItems[2]],
            ["align-items", alignItems[3]],
        ])) : style;
        var justifyContent = null;
        if (props.startJustified) {
            justifyContent = ["start", "flex-start", "start", "flex-start"];
        }
        else if (props.centerJustified) {
            justifyContent = ["center", "center", "center", "center"];
        }
        else if (props.endJustified) {
            justifyContent = ["end", "flex-end", "end", "flex-end"];
        }
        else if (props.justified) {
            justifyContent = ["justify", "space-between", "justify", "space-between"];
        }
        else if (props.aroundJustified) {
            justifyContent = ["", "space-around", "distribute", "space-around"];
        }
        style = justifyContent ? __assign({}, style, util_1.mergeCSSProps([
            ["-webkit-box-pack", justifyContent[0]],
            ["-webkit-justify-content", justifyContent[1]],
            ["-ms-flex-pack", justifyContent[2]],
            ["justify-content", justifyContent[3]],
        ])) : style;
        return (React.createElement(Item_1.default, __assign({ layout: true }, otherProps, { style: __assign({}, style, props.style) }), props.children));
    };
    return Box;
}(React.Component));
exports.default = Box;
