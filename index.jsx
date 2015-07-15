import React from "react";

function assign(target, source) {
    for (let k in source) target[k] = source[k];
}

const Item = React.createClass({
    // See Polymer layout attributes
    propTypes: {
        flex: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.string
        ]),
        layout: React.PropTypes.bool,
        wrap: React.PropTypes.bool,
        reverse: React.PropTypes.bool,
        horizontal: React.PropTypes.bool,
        vertical: React.PropTypes.bool,
        center: React.PropTypes.bool,
        start: React.PropTypes.bool,
        end: React.PropTypes.bool,
        stretch: React.PropTypes.bool,
        startJustified: React.PropTypes.bool,
        centerJustified: React.PropTypes.bool,
        endJustified: React.PropTypes.bool,
        justified: React.PropTypes.bool,
        aroundJustified: React.PropTypes.bool,
        selfStart: React.PropTypes.bool,
        selfCenter: React.PropTypes.bool,
        selfEnd: React.PropTypes.bool,
        selfStretch: React.PropTypes.bool,
        relative: React.PropTypes.bool,
        fit: React.PropTypes.bool,
        hidden: React.PropTypes.bool
    },

    render() {
        let props = this.props;
        let style = props.layout ? {display: "flex"} : {};
        // flex
        if (typeof(props.flex) === "string") {
            style.flex = props.flex;
        } else if (props.flex) {
            style.flex = "1 1 1e-9px";
        }
        // flex-wrap
        if (props.wrap) {
            style.flexWrap = "wrap";
        }
        // flex-direction
        if (props.vertical) {
            style.flexDirection = style.WebkitFlexDirection = props.reverse ? "column-reverse" : "column";
        } else {
            style.flexDirection = style.WebkitFlexDirection = props.reverse ? "row-reverse" : "row";
        }
        // align-items
        if (props.center) {
            style.alignItems = "center";
        } else if (props.start) {
            style.alignItems = "flex-start";
        } else if (props.end) {
            style.alignItems = "flex-end";
        } else if (props.stretch) {
            style.alignItems = "stretch";
        }
        // justify-content
        if (props.startJustified) {
            style.justifyContent = "flex-start";
        } else if (props.centerJustified) {
            style.justifyContent = "center";
        } else if (props.endJustified) {
            style.justifyContent = "flex-end";
        } else if (props.justified) {
            style.justifyContent = "space-between";
        } else if (props.aroundJustified) {
            style.justifyContent = "space-around";
        }
        // align-self
        if (props.selfStart) {
            style.alignSelf = "flex-start";
        } else if (props.selfCenter) {
            style.alignSelf = "center";
        } else if (props.selfEnd) {
            style.alignSelf = "flex-end";
        } else if (props.selfStretch) {
            style.alignSelf = "stretch";
        }
        // other
        if (props.relative) {
            style.position = "relative";
        } else if (props.fit) {
            style.position = "absolute";
            style.top = style.bottom = style.left = style.right = 0;
        }
        if (props.hidden) {
            style.display = "none";
        }
        
        assign(style, props.style);
        return <div {...props} style={style}>{props.children}</div>;
    }
});

const Layout = React.createClass({
    render() {
        return <Item layout {...this.props}>{this.props.children}</Item>;
    }
});

const Dialog = React.createClass({
    propTypes: {
        style: React.PropTypes.object,
        maskStyle: React.PropTypes.object
    },

    getInitialState() {
        return {
            display: "none",
            opacity: 0,
            marginTop: -100,
            timer: null
        };
    },

    componentDidMount() {
        this.refs.mask.getDOMNode().onclick = e =>
            e.target !== this.refs.dialog.getDOMNode() && this.hide();
    },

    componentWillUnmount() {
        this.refs.mask.getDOMNode().onclick = undefined;
    },

    show() {
        if (this.state.timer) return;
        let that = this;
        this.state.timer = setInterval(() => {
            if (that.state.opacity < 0.99) {
                that.state.opacity += 0.10;
                that.state.marginTop += 10;
                that.setState({display: "flex"});
            } else {
                clearInterval(that.state.timer);
                that.state.timer = null;
            }
        }, 20);
    },

    hide() {
        if (this.state.timer) return;
        let that = this;
        this.state.timer = setInterval(() => {
            if (that.state.opacity < 0.01) {
                that.setState({display: "none"});
                clearInterval(that.state.timer);
                that.state.timer = null;
            } else {
                that.state.opacity -= 0.10;
                that.state.marginTop -= 10;
                that.setState({});
            }
        }, 20);
    },

    render() {
        let maskStyle = {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            zIndex: 9
        };

        maskStyle.display = this.state.display;
        maskStyle.opacity = this.state.opacity;
        assign(maskStyle, this.props.maskStyle);

        let dialogStyle = {
            width: "50%",
            background: "white",
            padding: "1em",
            boxShadow: "0 4px 8px #333"
        };

        dialogStyle.marginTop = this.state.marginTop;
        assign(dialogStyle, this.props.style);

        return (
            <Layout ref="mask" center centerJustified style={maskStyle}>
                <Item ref="dialog" style={dialogStyle}>
                    {this.props.children}
                </Item>
            </Layout>
        );
    }
});

export default {
    Layout: Layout,
    Item: Item,
    Dialog: Dialog
};
