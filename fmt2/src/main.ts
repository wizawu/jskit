#!/usr/bin/env node

import * as fs from "fs"
import { formatJSON, formatXML, formatYAML } from "./format"

const opts = process.argv[2]
const source = process.argv[3]
const target = process.argv[4]

if (!opts) process.exit(2)
if (!source) process.exit(3)

const input = fs.readFileSync(source, "utf-8")
let output: string = ""
switch (opts) {
    case "-j":
        output = formatJSON(input)
        break
    case "-x":
        output = formatXML(input)
        break
    case "-y":
        output = formatYAML(input)
        break
    default:
        output = input
}

if (target) {
    fs.writeFileSync(target, output)
} else {
    console.log(output)
}
