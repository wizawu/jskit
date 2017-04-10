import * as React from "react"

export function cssSupports(property: string, value: string): boolean {
    let span: any = document.createElement("span")
    span.style[property] = value
    return span.style[property] === value
}

export function mergeCSSProps(props: any[]): React.CSSProperties {
    let style: React.CSSProperties = {}
    props.forEach(([prop, value]) => {
        if (cssSupports(prop, value)) style[prop] = value
    })
    return style
}