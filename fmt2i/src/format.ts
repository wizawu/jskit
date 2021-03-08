import XML from "xml-js"
import YAML from "yaml"

function sortObject(doc: any): any {
  if (typeof doc !== "object") return doc
  if (Array.isArray(doc)) return doc.map(it => sortObject(it))
  return Object.keys(doc).sort().reduce((res, k) => {
    if (typeof doc[k] === "object") {
      res[k] = sortObject(doc[k] as any)
    } else {
      res[k] = doc[k]
    }
    return res
  }, {} as any)
}

export function formatJSON(input: string, sorted = false) {
  let doc = JSON.parse(input)
  if (sorted) doc = sortObject(doc)
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
