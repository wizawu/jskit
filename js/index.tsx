import * as React from "react"

const useWebkit = ("WebkitAppearance" in document.documentElement.style) && !window.hasOwnProperty("chrome")

namespace ReactPolymerLayout {
    export interface ItemProps {
        flex?: boolean | number | string
        layout?: boolean
        selfStart?: boolean
        selfCenter?: boolean
        selfEnd?: boolean
        selfStretch?: boolean
        relative?: boolean
        fit?: boolean
        hidden?: boolean
        style?: React.CSSProperties
        className?: string
    }

    export interface BoxProps extends ItemProps {
        wrap?: boolean
        reverse?: boolean
        horizontal?: boolean
        vertical?: boolean
        center?: boolean
        start?: boolean
        end?: boolean
        stretch?: boolean
        startJustified?: boolean
        centerJustified?: boolean
        endJustified?: boolean
        justified?: boolean
        aroundJustified?: boolean
    }

    export interface DialogProps extends ItemProps {
        maskStyle?: React.CSSProperties
    }

    export interface DialogState {
        display?: string,
        opacity?: number,
        marginTop?: number,
        timer?: any,
    }

    export class Item extends React.Component<ItemProps, {}> {
        render() {
            const props = this.props

            let style: React.CSSProperties = props.layout ? {
                display: useWebkit ? "-webkit-box" : "flex"
            } : {}

            // flex
            if (typeof(props.flex) === "boolean") {
                style.flex = style["WebkitBoxFlex"] = 1
            } else if (typeof(props.flex) === "number") {
                style.flex = style["WebkitBoxFlex"] = props.flex as number
            } else if (typeof(props.flex) === "string") {
                style.flex = style["WebkitBoxFlex"] = props.flex as string
            }

            // align-self
            if (props.selfStart) {
                style.alignSelf = style["WebkitAlignSelf"] = "flex-start"
            } else if (props.selfCenter) {
                style.alignSelf = style["WebkitAlignSelf"] = "center"
            } else if (props.selfEnd) {
                style.alignSelf = style["WebkitAlignSelf"] = "flex-end"
            } else if (props.selfStretch) {
                style.alignSelf = style["WebkitAlignSelf"] = "stretch"
            }

            // other
            if (props.relative) {
                style.position = "relative"
            } else if (props.fit) {
                style.position = "absolute"
                style.top = style.bottom = style.left = style.right = 0
            }
            if (props.hidden) style.display = "none"

            style = Object.assign(style, props.style)

            return <div ref="root" {...props} className={props.className} style={style}>{props.children}</div>
        }
    }

    export class Box extends React.Component<BoxProps, {}> {
        render() {
            const props = this.props
            let style: React.CSSProperties = {}

            // flex-wrap
            if (props.wrap) style["flexWrap"] = style["WebkitFlexWrap"] = "wrap"

            // flex-direction
            if (props.vertical) {
                style.flexDirection = style["WebkitFlexDirection"] = props.reverse ? "column-reverse" : "column"
                style["WebkitBoxOrient"] = "vertical"
            } else {
                style.flexDirection = style["WebkitFlexDirection"] = props.reverse ? "row-reverse" : "row"
                style["WebkitBoxOrient"] = "horizontal"
            }

            // align-items
            if (props.center) {
                style.alignItems = style["WebkitBoxAlign"] = "center"
            } else if (props.start) {
                style.alignItems = "flex-start"
                style["WebkitBoxAlign"] = "start"
            } else if (props.end) {
                style.alignItems = "flex-end"
                style["WebkitBoxAlign"] = "end"
            } else if (props.stretch) {
                style.alignItems = style["WebkitBoxAlign"] = "stretch"
            }

            // justify-content
            if (props.startJustified) {
                style.justifyContent = "flex-start"
                style["WebkitBoxPack"] = "start"
            } else if (props.centerJustified) {
                style.justifyContent = "center"
                style["WebkitBoxPack"] = "center"
            } else if (props.endJustified) {
                style.justifyContent = "flex-end"
                style["WebkitBoxPack"] = "end"
            } else if (props.justified) {
                style.justifyContent = "space-between"
            } else if (props.aroundJustified) {
                style.justifyContent = "space-around"
            }

            style = Object.assign(style, props.style)

            return <Item ref="root" layout {...props} style={style}>{props.children}</Item>
        }
    }

    export type Layout = Box

    export class Dialog extends React.Component<DialogProps, DialogState> {
        constructor(props: DialogProps) {
            super(props)
            this.state = {
                display: "none",
                opacity: 0,
                marginTop: -50,
                timer: null
            }
        }

        componentDidMount() {
            this._getDOMNode(this.refs["mask"]).addEventListener("click", this._autoHide)
        }

        componentWillUnmount() {
            this._getDOMNode(this.refs["mask"]).removeEventListener("click", this._autoHide)
        }

        _getDOMNode(element: any): any {
            if (React.version < "1") {
                return element.getDOMNode()
            } else {
                return element.refs["root"].refs.root
            }
        }

        _autoHide(e: any) {
            if (e.target === this._getDOMNode(this.refs["mask"])) this.hide()
        }

        show() {
            if (this.state.timer) return
            let that = this
            this.state.timer = setInterval(() => {
                if (that.state.opacity < 0.99) {
                    that.state.opacity += 0.10
                    that.state.marginTop += 5
                    that.setState({display: useWebkit ? "-webkit-box" : "flex"})
                } else {
                    clearInterval(that.state.timer)
                    that.state.timer = null
                }
            }, 20)
        }

        hide() {
            if (this.state.timer) return
            let that = this
            this.state.timer = setInterval(() => {
                if (that.state.opacity < 0.01) {
                    that.setState({display: "none"})
                    clearInterval(that.state.timer)
                    that.state.timer = null
                } else {
                    that.state.opacity -= 0.10
                    that.state.marginTop -= 5
                    that.setState({})
                }
            }, 20)
        }

        render() {
            const maskStyle: React.CSSProperties = Object.assign({
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.6)",
                zIndex: 9,
                display: this.state.display,
                opacity: Math.sin(Math.PI * this.state.opacity / 2)
            }, this.props.maskStyle)

            const dialogStyle: React.CSSProperties = Object.assign({
                width: "50%",
                background: "white",
                padding: "1em",
                boxShadow: "0 4px 8px #333",
                marginTop: Math.sin(Math.PI * this.state.marginTop / 100) * 50
            }, this.props.style)

            return (
                <Box ref="mask" center centerJustified style={maskStyle}>
                    <Item ref="dialog" style={dialogStyle} className={this.props.className}>
                        {this.props.children}
                    </Item>
                </Box>
            )
        }
    }
}

export = ReactPolymerLayout