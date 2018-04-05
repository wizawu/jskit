#!/usr/bin/env node

if (process.argv[2] === undefined) {
    console.error("Usage: cat some.json | object-path-cli <path> [convertor]")
    console.error("Example:")
    console.error("    cat package.json | object-path-cli version")
    console.error("    cat package.json | object-path-cli version parseInt")
    console.error("    cat package.json | object-path-cli bin toUpperCase")
    console.error("    cat package.json | object-path-cli bin 'substr(2)'")
    process.exit(1)
}

var objectPath = require("object-path")

var buffer = ""

process.stdin.resume()
process.stdin.on("data", function (chunk) {
    buffer += chunk
})
process.stdin.on("end", function () {
    var path = process.argv[2]
    var conv = process.argv[3]

    try {
        var json = JSON.parse(buffer)
    } catch (e) {
        console.log(undefined)
        process.exit(1)
    }
    var value = objectPath.get(json, path)

    if (conv) {
        if (typeof global[conv] === "function") {
            eval("console.log(" + conv + "(value))")
        } else if (conv in value.__proto__) {
            eval("console.log(value." + conv + "())")
        } else {
            eval("console.log(value." + conv + ")")
        }
    } else {
        console.log(value)
    }
})
