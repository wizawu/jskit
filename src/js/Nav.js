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
var ReactDOM = require("react-dom");
var Box_1 = require("./Box");
var Item_1 = require("./Item");
var util = require("./util");
var Nav = (function (_super) {
    __extends(Nav, _super);
    function Nav(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { portrait: false, menu: false };
        _this.onResize = _this.onResize.bind(_this);
        _this.onHashChange = _this.onHashChange.bind(_this);
        return _this;
    }
    Nav.prototype.componentDidMount = function () {
        window.addEventListener("hashchange", this.onHashChange);
        window.addEventListener("resize", this.onResize);
        this.onResize();
    };
    Nav.prototype.componentWillUnmount = function () {
        window.removeEventListener("hashchange", this.onHashChange);
        window.removeEventListener("resize", this.onResize);
    };
    Nav.prototype.onResize = function () {
        this.setState({ portrait: window.innerHeight > window.innerWidth });
    };
    Nav.prototype.onHashChange = function () {
        var _this = this;
        this.setState({ menu: false }, function () {
            ReactDOM.findDOMNode(_this.refs.main).scrollTop = 0;
        });
    };
    Nav.prototype.render = function () {
        var _this = this;
        var innerWidth = util.isNode() ? 0 : window.innerWidth;
        var menu = this.state.menu;
        var _a = this.props, logo = _a.logo, headMenu = _a.headMenu, sideMenu = _a.sideMenu, headStyle = _a.headStyle, sideStyle = _a.sideStyle, style = _a.style, children = _a.children, otherProps = __rest(_a, ["logo", "headMenu", "sideMenu", "headStyle", "sideStyle", "style", "children"]);
        var transitionSide = "margin-left 500ms";
        var transitionMask = menu ?
            "background-color 500ms, z-index 0ms" :
            "background-color 500ms, z-index 0ms 500ms";
        var portrait = (React.createElement(Box_1.default, __assign({ vertical: true, fit: true }, otherProps, { style: __assign({ overflow: "hidden" }, style) }),
            React.createElement(Box_1.default, { center: true, style: headStyle },
                React.createElement("div", { onClick: function () { return _this.setState({ menu: true }); }, style: {
                        fontSize: "2em",
                        padding: ".5em .64em",
                        lineHeight: 1,
                        cursor: "pointer"
                    } }, "\u2261"),
                React.createElement(Item_1.default, { flex: true }),
                logo),
            React.createElement(Box_1.default, { flex: true },
                React.createElement(Item_1.default, { flex: true, relative: true, style: { overflow: "auto" } },
                    React.createElement(Item_1.default, { style: { position: "absolute", width: "100%" } }, children))),
            React.createElement(Box_1.default, { fit: true, style: {
                    backgroundColor: "rgba(0,0,0," + (menu ? 0.64 : 0) + ")",
                    zIndex: menu ? 9 : -999,
                    WebkitTransition: transitionMask,
                    MsTransition: transitionMask,
                    transition: transitionMask,
                } },
                React.createElement(Item_1.default, { ref: "main", relative: true, style: __assign({}, {
                        height: "100%", overflow: "auto",
                        marginLeft: menu ? 0 : -innerWidth,
                        WebkitTransition: transitionSide,
                        MsTransition: transitionSide,
                        transition: transitionSide,
                    }, sideStyle) },
                    headMenu,
                    sideMenu),
                React.createElement(Item_1.default, { flex: true, onClick: function () { return _this.setState({ menu: false }); } }))));
        var landscape = (React.createElement(Box_1.default, __assign({ vertical: true, fit: true }, otherProps, { style: __assign({ overflow: "hidden" }, style) }),
            React.createElement(Box_1.default, { center: true, style: __assign({ zIndex: 5 }, headStyle) },
                logo,
                React.createElement(Item_1.default, { flex: true }),
                headMenu),
            React.createElement(Box_1.default, { flex: true },
                React.createElement(Item_1.default, { relative: true, style: __assign({}, { height: "100%", overflow: "auto" }, sideStyle) }, sideMenu),
                React.createElement(Item_1.default, { ref: "main", flex: true, relative: true, style: { overflow: "auto" } },
                    React.createElement(Item_1.default, { style: { position: "absolute", width: "100%" } }, children)))));
        return this.state.portrait ? portrait : landscape;
    };
    return Nav;
}(React.Component));
exports.default = Nav;
