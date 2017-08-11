#!/usr/bin/env node

var objectPath = require("object-path")

var buffer = ""

process.stdin.resume()
process.stdin.on("data", function (chunk) {
    buffer += chunk
})
process.stdin.on("end", function () {
    var path = process.argv[2]
    var conv = process.argv[3]

    var json = JSON.parse(buffer)
    var value = objectPath.get(json, path)

    if (conv) {
        eval("console.log(" + conv + "(value))")
    } else {
        console.log(value)
    }
})
