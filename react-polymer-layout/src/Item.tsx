import * as React from "react"
import * as ReactDOM from "react-dom"

export interface MsCSSPropperties {
    MsFlex?: string
    MsFlexAlign?: string
    MsFlexDirection?: string
    MsFlexItemAlign?: string
    MsFlexPack?: string
    MsFlexWrap?: string
}

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
    overflow?: boolean | string

    id?: string
    className?: string
    style?: React.CSSProperties
}

export default class Item extends React.Component<Props, any> {
    componentDidMount() {
        this.insertDisplayFlex()
    }

    componentDidUpdate() {
        this.insertDisplayFlex()
    }

    insertDisplayFlex() {
        if (this.props.layout) {
            let root: any = ReactDOM.findDOMNode(this.refs.root)
            let values = ["-webkit-box", "-webkit-flex", "-ms-flexbox", "flex"].map(v => "display:" + v + ";").join("")
            let style = root.getAttribute("style") || ""
            if (style.indexOf(values) !== 0) root.setAttribute("style", values + style)
        }
    }

    render() {
        const props = this.props
        const {
            flex, layout, selfStart, selfCenter, selfEnd, selfStretch, relative,
            fit, fullbleed, hidden, children, ...otherProps
        } = props

        let style: React.CSSProperties & MsCSSPropperties = {}

        switch (typeof (props.flex)) {
            case "boolean":
            case "number":
            case "string":
                let flex = (props.flex === true ? "1 1 0" : (props.flex || "")).toString()
                style = {
                    ...style,
                    WebkitBoxFlex: flex as any,
                    WebkitFlex: flex,
                    MsFlex: flex,
                    flex: flex,
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
            ...style,
            WebkitAlignSelf: alignSelf[0],
            MsFlexItemAlign: alignSelf[1],
            alignSelf: alignSelf[2],
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
        style.overflow = props.overflow === true ? "auto" : (props.overflow || "hidden")

        return (
            <div ref="root" {...otherProps} style={{ ...style, ...props.style }}>
                {children}
            </div>
        )
    }
}
