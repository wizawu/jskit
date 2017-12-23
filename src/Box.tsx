import * as React from "react"
import Item, { Props as ItemProps } from "./Item"

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
                ...style,
                WebkitFlexWrap: "wrap",
                MsFlexWrap: "wrap",
                flexWrap: "wrap",
            }
        }

        if (props.vertical) {
            style = {
                ...style,
                WebkitBoxOrient: "vertical",
                WebkitBoxDirection: props.reverse ? "reverse" : "normal",
                WebkitFlexDirection: props.reverse ? "column-reverse" : "column",
                MsFlexDirection: props.reverse ? "column-reverse" : "column",
                flexDirection: props.reverse ? "column-reverse" : "column",
            }
        } else {
            style = {
                ...style,
                WebkitBoxOrient: "horizontal",
                WebkitBoxDirection: props.reverse ? "reverse" : "normal",
                WebkitFlexDirection: props.reverse ? "row-reverse" : "row",
                MsFlexDirection: props.reverse ? "row-reverse" : "row",
                flexDirection: props.reverse ? "row-reverse" : "row",
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
            ...style,
            WebkitBoxAlign: alignItems[0],
            WebkitAlignItems: alignItems[1],
            MsFlexAlign: alignItems[2],
            alignItems: alignItems[3] as any,
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
            ...style,
            WebkitBoxPack: justifyContent[0],
            WebkitJustifyContent: justifyContent[1],
            MsFlexPack: justifyContent[2],
            justifyContent: justifyContent[3] as any,
        } : style

        return (
            <Item layout {...otherProps} style={{ ...style, ...props.style }}>
                {children}
            </Item>
        )
    }
}
