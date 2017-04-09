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
var useWebkit = ("WebkitAppearance" in document.documentElement.style) && !window.hasOwnProperty("chrome");
function cssSupports(property, value) {
    var span = document.createElement("span");
    span.style[property] = value;
    return span.style[property] === value;
}
function assign(target, source) {
    var a = target || {};
    var b = source || {};
    Object.keys(b).forEach(function (key) { return a[key] = b[key]; });
    return a;
}
var Item = (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.prototype.render = function () {
        var props = this.props;
        var style = props.layout ? {
            display: cssSupports("display", "flex") ? "flex" : (cssSupports("display", "-webkit-flex") ? "-webkit-flex" : "-webkit-box")
        } : {};
        if (typeof (props.flex) === "boolean") {
            style.flex = style["WebkitBoxFlex"] = 1;
        }
        else if (typeof (props.flex) === "number") {
            style.flex = style["WebkitBoxFlex"] = props.flex;
        }
        else if (typeof (props.flex) === "string") {
            style.flex = style["WebkitBoxFlex"] = props.flex;
        }
        if (props.selfStart) {
            style.alignSelf = style["WebkitAlignSelf"] = "flex-start";
        }
        else if (props.selfCenter) {
            style.alignSelf = style["WebkitAlignSelf"] = "center";
        }
        else if (props.selfEnd) {
            style.alignSelf = style["WebkitAlignSelf"] = "flex-end";
        }
        else if (props.selfStretch) {
            style.alignSelf = style["WebkitAlignSelf"] = "stretch";
        }
        if (props.relative) {
            style.position = "relative";
        }
        else if (props.fit) {
            style.position = "absolute";
            style.top = style.bottom = style.left = style.right = 0;
        }
        if (props.hidden)
            style.display = "none";
        style = assign(style, props.style);
        return React.createElement("div", __assign({ ref: "root" }, props, { style: style }), props.children);
    };
    return Item;
}(React.Component));
exports.Item = Item;
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Box.prototype.render = function () {
        var props = this.props;
        var style = {};
        if (props.wrap)
            style["flexWrap"] = style["WebkitFlexWrap"] = "wrap";
        if (props.vertical) {
            style.flexDirection = style["WebkitFlexDirection"] = props.reverse ? "column-reverse" : "column";
            style["WebkitBoxOrient"] = "vertical";
        }
        else {
            style.flexDirection = style["WebkitFlexDirection"] = props.reverse ? "row-reverse" : "row";
            style["WebkitBoxOrient"] = "horizontal";
        }
        if (props.center) {
            style.alignItems = style["WebkitBoxAlign"] = "center";
        }
        else if (props.start) {
            style.alignItems = "flex-start";
            style["WebkitBoxAlign"] = "start";
        }
        else if (props.end) {
            style.alignItems = "flex-end";
            style["WebkitBoxAlign"] = "end";
        }
        else if (props.stretch) {
            style.alignItems = style["WebkitBoxAlign"] = "stretch";
        }
        if (props.startJustified) {
            style.justifyContent = "flex-start";
            style["WebkitBoxPack"] = "start";
        }
        else if (props.centerJustified) {
            style.justifyContent = "center";
            style["WebkitBoxPack"] = "center";
        }
        else if (props.endJustified) {
            style.justifyContent = "flex-end";
            style["WebkitBoxPack"] = "end";
        }
        else if (props.justified) {
            style.justifyContent = "space-between";
        }
        else if (props.aroundJustified) {
            style.justifyContent = "space-around";
        }
        style = assign(style, props.style);
        return React.createElement(Item, __assign({ ref: "root", layout: true }, props, { style: style }), props.children);
    };
    return Box;
}(React.Component));
exports.Box = Box;
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog(props) {
        var _this = _super.call(this, props) || this;
        var that = _this;
        _this.state = {
            display: "none",
            opacity: 0,
            marginTop: -50,
            timer: null,
            handleClickMask: function (e) {
                if (e.target === that._getDOMNode(that.refs["mask"]))
                    that.hide();
            }
        };
        return _this;
    }
    Dialog.prototype.componentDidMount = function () {
        this._getDOMNode(this.refs["mask"]).addEventListener("click", this.state.handleClickMask);
    };
    Dialog.prototype.componentWillUnmount = function () {
        this._getDOMNode(this.refs["mask"]).removeEventListener("click", this.state.handleClickMask);
    };
    Dialog.prototype._getDOMNode = function (element) {
        if (React.version < "1") {
            return element.refs["root"].refs.root.getDOMNode();
        }
        else {
            return element.refs["root"].refs.root;
        }
    };
    Dialog.prototype.show = function () {
        if (this.state.timer)
            return;
        var that = this;
        this.setState({
            timer: setInterval(function () {
                if (that.state.opacity < 0.99) {
                    that.setState({
                        display: useWebkit ? "-webkit-box" : "flex",
                        opacity: that.state.opacity + 0.10,
                        marginTop: that.state.marginTop + 5
                    });
                }
                else {
                    clearInterval(that.state.timer);
                    that.state.timer = null;
                }
            }, 20)
        });
    };
    Dialog.prototype.hide = function () {
        if (this.state.timer)
            return;
        var that = this;
        this.setState({
            timer: setInterval(function () {
                if (that.state.opacity < 0.01) {
                    that.setState({ display: "none" });
                    clearInterval(that.state.timer);
                    that.state.timer = null;
                }
                else {
                    that.setState({
                        opacity: that.state.opacity - 0.10,
                        marginTop: that.state.marginTop - 5
                    });
                }
            }, 20)
        });
    };
    Dialog.prototype.render = function () {
        var maskStyle = assign({
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            zIndex: 9,
            display: this.state.display,
            opacity: Math.sin(Math.PI * this.state.opacity / 2)
        }, this.props.maskStyle);
        var dialogStyle = assign({
            width: "50%",
            background: "white",
            padding: "1em",
            boxShadow: "0 4px 8px #333",
            marginTop: Math.sin(Math.PI * this.state.marginTop / 100) * 50
        }, this.props.style);
        return (React.createElement(Box, { ref: "mask", center: true, centerJustified: true, style: maskStyle },
            React.createElement(Item, { ref: "dialog", style: dialogStyle, className: this.props.className }, this.props.children)));
    };
    return Dialog;
}(React.Component));
exports.Dialog = Dialog;
