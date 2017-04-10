import * as React from "react"
import { mergeCSSProps } from "./util"

export interface Props extends React.DOMAttributes<any> {
    flex?: boolean | number | string
    layout?: boolean
    selfStart?: boolean
    selfCenter?: boolean
    selfEnd?: boolean
    selfStretch?: boolean
    relative?: boolean
    fit?: boolean
    fullbleed?: boolean
    hidden?: boolean
    style?: React.CSSProperties
    className?: string
}

export default class Item extends React.Component<Props, any> {
    render() {
        const props = this.props

        let style = props.layout ? mergeCSSProps([
            ["display", "-ms-flexbox"],
            ["display", "-webkit-box"],
            ["display", "-webkit-flex"],
            ["display", "flex"],
        ]) : {}

        switch (typeof (props.flex)) {
            case "boolean":
            case "number":
            case "string":
                let flex = (props.flex === true ? 1 : props.flex || "").toString()
                style = {
                    ...style, ...{
                        "-webkit-box-flex": flex,
                        "-webkit-flex": flex,
                        "-ms-flex": flex,
                        "flex": flex,
                    }
                }
                break
        }

        let alignSelf: string[] | null = null
        if (props.selfStart) {
            alignSelf = ["flex-start", "start", "flex-start"]
        } else if (props.selfCenter) {
            alignSelf = ["center", "center", "center"]
        } else if (props.selfEnd) {
            alignSelf = ["flex-end", "end", "flex-end"]
        } else if (props.selfStretch) {
            alignSelf = ["stretch", "stretch", "stretch"]
        }
        style = alignSelf ? {
            ...style, ...mergeCSSProps([
                ["-webkit-align-self", alignSelf[0]],
                ["-ms-flex-item-align", alignSelf[1]],
                ["align-self", alignSelf[2]],
            ])
        } : style

        if (props.relative) {
            style.position = "relative"
        } else if (props.fit) {
            style.position = "absolute"
            style.top = style.bottom = style.left = style.right = 0
        }

        if (props.fullbleed) {
            style.margin = 0
            style.height = "100vh"
        }

        if (props.hidden) style.display = "none"

        return <div {...props} style={{ ...style, ...props.style }}>{props.children}</div>
    }
}