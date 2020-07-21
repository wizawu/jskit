import XML from "xml-js"
import YAML from "yaml"
import { isArray, isObject } from "util"

YAML.scalarOptions.str.fold.lineWidth = 120

export function formatJSON(input: string) {
    let json = JSON.parse(input)
    return JSON.stringify(json, null, 2) + "\n"
}

export function formatXML(input: string) {
    let xml = XML.xml2js(input)
    return XML.js2xml(xml, { spaces: 2 }) + "\n"
}

export function formatYAML(input: string) {
    let opts: YAML.Options = { schema: "yaml-1.1" }
    let yaml = YAML.parse(input, opts)
    if (isArray(yaml)) {
        return yaml.map(obj => YAML.stringify([obj], opts)).join("\n")
    } else if (isObject(yaml)) {
        return Object.keys(yaml).map(key => YAML.stringify({ [key]: yaml[key] }, opts)).join("\n")
    } else {
        return YAML.stringify(yaml, opts)
    }
}
