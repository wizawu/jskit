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
var util_1 = require("./util");
var Item = (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.prototype.render = function () {
        var props = this.props;
        var style = props.layout ? util_1.mergeCSSProps([
            ["display", "flex"],
            ["display", "-webkit-flex"],
            ["display", "-webkit-box"],
            ["display", "-ms-flexbox"],
        ]) : {};
        switch (typeof (props.flex)) {
            case "boolean":
            case "number":
            case "string":
                var flex = props.flex === true ? 1 : props.flex;
                style = __assign({}, style, util_1.mergeCSSProps([
                    ["-webkit-box-flex", flex],
                    ["-webkit-flex", flex],
                    ["-ms-flex", flex],
                    ["flex", flex],
                ]));
                break;
        }
        var alignSelf = null;
        if (props.selfStart) {
            alignSelf = ["flex-start", "start", "flex-start"];
        }
        else if (props.selfCenter) {
            alignSelf = ["center", "center", "center"];
        }
        else if (props.selfEnd) {
            alignSelf = ["flex-end", "end", "flex-end"];
        }
        else if (props.selfStretch) {
            alignSelf = ["stretch", "stretch", "stretch"];
        }
        style = alignSelf ? __assign({}, style, util_1.mergeCSSProps([
            ["-webkit-align-self", alignSelf[0]],
            ["-ms-flex-item-align", alignSelf[1]],
            ["align-self", alignSelf[2]],
        ])) : style;
        if (props.relative) {
            style.position = "relative";
        }
        else if (props.fit) {
            style.position = "absolute";
            style.top = style.bottom = style.left = style.right = 0;
        }
        if (props.hidden)
            style.display = "none";
        return React.createElement("div", __assign({}, props, { style: __assign({}, style, props.style) }), props.children);
    };
    return Item;
}(React.Component));
exports["default"] = Item;
