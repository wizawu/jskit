export function isNode(): boolean {
    return typeof window === "undefined" || typeof navigator === "undefined"
}

export function cssSupports(property: string, values: string[]): string {
    if (isNode()) return values[values.length - 1]
    let value = values[0]
    values.forEach(v => {
        let span: any = document.createElement("span")
        span.style[property] = v
        if (span.style[property] === v) value = v
    })
    return value
}
