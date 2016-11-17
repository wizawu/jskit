"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var useWebkit = ("WebkitAppearance" in document.documentElement.style) && !window.hasOwnProperty("chrome");
var ReactPolymerLayout;
(function (ReactPolymerLayout) {
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item() {
            _super.apply(this, arguments);
        }
        Item.prototype.render = function () {
            var props = this.props;
            var style = props.layout ? {
                display: useWebkit ? "-webkit-box" : "flex"
            } : {};
            // flex
            if (typeof (props.flex) === "boolean") {
                style.flex = style["WebkitBoxFlex"] = 1;
            }
            else if (typeof (props.flex) === "number") {
                style.flex = style["WebkitBoxFlex"] = props.flex;
            }
            else if (typeof (props.flex) === "string") {
                style.flex = style["WebkitBoxFlex"] = props.flex;
            }
            // align-self
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
            // other
            if (props.relative) {
                style.position = "relative";
            }
            else if (props.fit) {
                style.position = "absolute";
                style.top = style.bottom = style.left = style.right = 0;
            }
            if (props.hidden)
                style.display = "none";
            style = Object.assign(style, props.style);
            return React.createElement("div", __assign({ref: "root"}, props, {className: props.className, style: style}), props.children);
        };
        return Item;
    }(React.Component));
    ReactPolymerLayout.Item = Item;
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box() {
            _super.apply(this, arguments);
        }
        Box.prototype.render = function () {
            var props = this.props;
            var style = {};
            // flex-wrap
            if (props.wrap)
                style["flexWrap"] = style["WebkitFlexWrap"] = "wrap";
            // flex-direction
            if (props.vertical) {
                style.flexDirection = style["WebkitFlexDirection"] = props.reverse ? "column-reverse" : "column";
                style["WebkitBoxOrient"] = "vertical";
            }
            else {
                style.flexDirection = style["WebkitFlexDirection"] = props.reverse ? "row-reverse" : "row";
                style["WebkitBoxOrient"] = "horizontal";
            }
            // align-items
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
            // justify-content
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
            style = Object.assign(style, props.style);
            return React.createElement(Item, __assign({ref: "root", layout: true}, props, {style: style}), props.children);
        };
        return Box;
    }(React.Component));
    ReactPolymerLayout.Box = Box;
    var Dialog = (function (_super) {
        __extends(Dialog, _super);
        function Dialog(props) {
            _super.call(this, props);
            this.state = {
                display: "none",
                opacity: 0,
                marginTop: -50,
                timer: null
            };
        }
        Dialog.prototype.componentDidMount = function () {
            this._getDOMNode(this.refs["mask"]).addEventListener("click", this._autoHide);
        };
        Dialog.prototype.componentWillUnmount = function () {
            this._getDOMNode(this.refs["mask"]).removeEventListener("click", this._autoHide);
        };
        Dialog.prototype._getDOMNode = function (element) {
            if (React.version < "1") {
                return element.getDOMNode();
            }
            else {
                return element.refs["root"].refs.root;
            }
        };
        Dialog.prototype._autoHide = function (e) {
            if (e.target === this._getDOMNode(this.refs["mask"]))
                this.hide();
        };
        Dialog.prototype.show = function () {
            if (this.state.timer)
                return;
            var that = this;
            this.state.timer = setInterval(function () {
                if (that.state.opacity < 0.99) {
                    that.state.opacity += 0.10;
                    that.state.marginTop += 5;
                    that.setState({ display: useWebkit ? "-webkit-box" : "flex" });
                }
                else {
                    clearInterval(that.state.timer);
                    that.state.timer = null;
                }
            }, 20);
        };
        Dialog.prototype.hide = function () {
            if (this.state.timer)
                return;
            var that = this;
            this.state.timer = setInterval(function () {
                if (that.state.opacity < 0.01) {
                    that.setState({ display: "none" });
                    clearInterval(that.state.timer);
                    that.state.timer = null;
                }
                else {
                    that.state.opacity -= 0.10;
                    that.state.marginTop -= 5;
                    that.setState({});
                }
            }, 20);
        };
        Dialog.prototype.render = function () {
            var maskStyle = Object.assign({
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
            var dialogStyle = Object.assign({
                width: "50%",
                background: "white",
                padding: "1em",
                boxShadow: "0 4px 8px #333",
                marginTop: Math.sin(Math.PI * this.state.marginTop / 100) * 50
            }, this.props.style);
            return (React.createElement(Box, {ref: "mask", center: true, centerJustified: true, style: maskStyle}, 
                React.createElement(Item, {ref: "dialog", style: dialogStyle, className: this.props.className}, this.props.children)
            ));
        };
        return Dialog;
    }(React.Component));
    ReactPolymerLayout.Dialog = Dialog;
})(ReactPolymerLayout || (ReactPolymerLayout = {}));
module.exports = ReactPolymerLayout;
