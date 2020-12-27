import XML from "xml-js"
import YAML from "yaml"

export function formatJSON(input: string, sorted = false) {
    let doc = JSON.parse(input)
    if (sorted) {
        doc = Object.keys(doc).sort().reduce((res, k) => {
            res[k] = doc[k]
            return res
        }, {} as any)
    }
    return JSON.stringify(doc, null, 2) + "\n"
}

export function formatXML(input: string) {
    let doc = XML.xml2js(input)
    return XML.js2xml(doc, { spaces: 2 }) + "\n"
}

export function formatYAML(input: string, lineWidth: number = 80) {
    YAML.scalarOptions.str.fold.lineWidth = lineWidth
    let doc = YAML.parseDocument(input, { indent: 2, schema: "yaml-1.1" })
    return doc.toString()
}
