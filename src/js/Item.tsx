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
    hidden?: boolean
    style?: React.CSSProperties
}

export default class Item extends React.Component<Props, any> {
    render() {
        const props = this.props

        let style = props.layout ? mergeCSSProps([
            ["display", "flex"],
            ["display", "-webkit-flex"],
            ["display", "-webkit-box"],
            ["display", "-ms-flexbox"],
        ]) : {}

        switch (typeof (props.flex)) {
            case "boolean":
            case "number":
            case "string":
                let flex = props.flex === true ? 1 : props.flex
                style = {
                    ...style, ...mergeCSSProps([
                        ["-webkit-box-flex", flex],
                        ["-webkit-flex", flex],
                        ["-ms-flex", flex],
                        ["flex", flex],
                    ])
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

        if (props.hidden) style.display = "none"

        return <div {...props} style={{ ...style, ...props.style }}>{props.children}</div>
    }
}