import * as React from "react"

export function isNode(): boolean {
    return typeof window === "undefined" || typeof navigator === "undefined"
}

export function cssSupports(property: string, value: string): string {
    let key = property.replace(/(-\w)/g, c => c.charAt(1).toUpperCase())
    if (isNode()) return key
    /*
     *  Set style["-webkit-box-pack"] to "center"
     *  If style.WebkitBoxPack is auto-assigned to "center", the property is supported
     */
    let span: any = document.createElement("span")
    span.style[property] = value
    return span.style[key] === value ? key : ""
}

export function mergeCSSProps(props: any[]): React.CSSProperties {
    let style: React.CSSProperties = {}
    props.forEach(([prop, value]) => {
        let key = cssSupports(prop, value)
        if (key) style[key] = value
    })
    return style
}