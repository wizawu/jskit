import * as React from "react"

export function cssSupports(property: string, value: string): boolean {
    /*
     *  Set style["-webkit-box-pack"] to "center"
     *  If style.WebkitBoxPack is auto-assigned to "center", the property is supported
     */
    let span: any = document.createElement("span")
    span.style[property] = value
    return span.style[property.replace(/(-\w)/g, c => c.charAt(1).toUpperCase())] === value
}

export function mergeCSSProps(props: any[]): React.CSSProperties {
    let style: React.CSSProperties = {}
    props.forEach(([prop, value]) => {
        if (cssSupports(prop, value)) style[prop] = value
    })
    return style
}