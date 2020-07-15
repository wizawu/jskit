import XML from "xml-js"
import YAML from "yaml"
import { isArray } from "util"

YAML.scalarOptions.str.fold.lineWidth = 120

export function formatJSON(input: string) {
    let json = JSON.parse(input)
    return JSON.stringify(json, null, 2)
}

export function formatXML(input: string) {
    let xml = XML.xml2js(input)
    return XML.js2xml(xml, { spaces: 2 })
}

export function formatYAML(input: string) {
    let yaml = YAML.parse(input)
    if (isArray(yaml)) {
        return yaml.map(obj => YAML.stringify([obj])).join("\n")
    } else {
        return YAML.stringify(yaml)
    }
}
