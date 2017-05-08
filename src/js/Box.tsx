import * as React from "react"
import Item, { Props as ItemProps } from "./Item"
import { mergeCSSProps } from "./util"

export interface Props extends ItemProps {
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

export default class Box extends React.Component<Props, any> {
    render() {
        const props = this.props
        let {
            wrap, reverse, horizontal, vertical, center, start, end, stretch,
            startJustified, centerJustified, endJustified, justified,
            aroundJustified, children, ...otherProps
        } = this.props

        let style: React.CSSProperties = {}

        if (props.wrap) {
            style = {
                ...style, ...mergeCSSProps([
                    ["-webkit-flex-wrap", "wrap"],
                    ["-ms-flex-wrap", "wrap"],
                    ["flex-wrap", "wrap"],
                ])
            }
        }

        if (props.vertical) {
            style = {
                ...style, ...mergeCSSProps([
                    ["-webkit-box-orient", "vertical"],
                    ["-webkit-box-direction", props.reverse ? "reverse" : "normal"],
                    ["-webkit-flex-direction", props.reverse ? "column-reverse" : "column"],
                    ["-ms-flex-direction", props.reverse ? "column-reverse" : "column"],
                    ["flex-direction", props.reverse ? "column-reverse" : "column"],
                ])
            }
        } else {
            style = {
                ...style, ...mergeCSSProps([
                    ["-webkit-box-orient", "horizontal"],
                    ["-webkit-box-direction", props.reverse ? "reverse" : "normal"],
                    ["-webkit-flex-direction", props.reverse ? "row-reverse" : "row"],
                    ["-ms-flex-direction", props.reverse ? "row-reverse" : "row"],
                    ["flex-direction", props.reverse ? "row-reverse" : "row"],
                ])
            }
        }

        let alignItems: string[] | null = null
        if (props.start) {
            alignItems = ["start", "flex-start", "start", "flex-start"]
        } else if (props.center) {
            alignItems = ["center", "center", "center", "center"]
        } else if (props.end) {
            alignItems = ["end", "flex-end", "end", "flex-end"]
        } else if (props.stretch) {
            alignItems = ["stretch", "stretch", "stretch", "stretch"]
        }
        style = alignItems ? {
            ...style, ...mergeCSSProps([
                ["-webkit-box-align", alignItems[0]],
                ["-webkit-align-items", alignItems[1]],
                ["-ms-flex-align", alignItems[2]],
                ["align-items", alignItems[3]],
            ])
        } : style

        let justifyContent: string[] | null = null
        if (props.startJustified) {
            justifyContent = ["start", "flex-start", "start", "flex-start"]
        } else if (props.centerJustified) {
            justifyContent = ["center", "center", "center", "center"]
        } else if (props.endJustified) {
            justifyContent = ["end", "flex-end", "end", "flex-end"]
        } else if (props.justified) {
            justifyContent = ["justify", "space-between", "justify", "space-between"]
        } else if (props.aroundJustified) {
            justifyContent = ["", "space-around", "distribute", "space-around"]
        }
        style = justifyContent ? {
            ...style, ...mergeCSSProps([
                ["-webkit-box-pack", justifyContent[0]],
                ["-webkit-justify-content", justifyContent[1]],
                ["-ms-flex-pack", justifyContent[2]],
                ["justify-content", justifyContent[3]],
            ])
        } : style

        return (
            <Item layout {...otherProps} style={{ ...style, ...props.style }}>
                {children}
            </Item>
        )
    }
}
