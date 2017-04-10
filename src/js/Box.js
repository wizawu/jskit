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
exports.__esModule = true;
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
            ["-webkit-box-pack", justifyContent],
            ["-webkit-justify-content", justifyContent],
            ["-ms-flex-pack", justifyContent],
            ["justify-content", justifyContent],
        ])) : style;
        return React.createElement(Item_1["default"], __assign({ layout: true }, props, { style: __assign({}, style, props.style) }), props.children);
    };
    return Box;
}(React.Component));
exports["default"] = Box;
