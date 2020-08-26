#!/usr/bin/env node

import * as fs from "fs"
import * as path from "path"
import { formatJSON, formatXML, formatYAML } from "./format"

const opts = process.argv[2]
const source = process.argv[3]
const target = process.argv[process.argv[4] === "{}" ? 3 : 4]
const version = (() => {
    let packagePath = path.resolve(__dirname, "..", "package.json")
    return JSON.parse(fs.readFileSync(packagePath, "utf-8")).version
})()

if (opts === "-v") {
    console.log(version)
    process.exit(0)
}

function help(code = 0) {
    console.log(`Version: ${version}`)
    console.log(`Usage:`)
    console.log(`  fmt2i -h                            Print help message`)
    console.log(`  fmt2i -v                            Print version`)
    console.log(`  fmt2i [-j|-x|-y] <source> [target]  Format JSON/XML/YAML`)
    process.exit(code)
}

if (opts === "-h") help(0)
if (!opts) help(2)
if (!source) help(3)

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
        if (/-y\d+/.test(opts)) {
            output = formatYAML(input, Number.parseInt(opts.substr(2)))
        } else {
            help(1)
        }
}

if (target) {
    fs.writeFileSync(target, output)
} else {
    process.stdout.write(output)
}
