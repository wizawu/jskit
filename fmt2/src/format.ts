import XML from "xml-js"
import YAML from "yaml"

YAML.scalarOptions.str.fold.lineWidth = 120

export function formatJSON(input: string) {
    let doc = JSON.parse(input)
    return JSON.stringify(doc, null, 2) + "\n"
}

export function formatXML(input: string) {
    let doc = XML.xml2js(input)
    return XML.js2xml(doc, { spaces: 2 }) + "\n"
}

export function formatYAML(input: string) {
    let doc = YAML.parseDocument(input, { indent: 2, schema: "yaml-1.1" })
    return doc.toString()
}
