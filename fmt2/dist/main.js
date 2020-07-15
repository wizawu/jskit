#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var format_1 = require("./format");
var opts = process.argv[2];
var source = process.argv[3];
var target = process.argv[4];
if (!opts)
    process.exit(2);
if (!source)
    process.exit(3);
var input = fs.readFileSync(source, "utf-8");
var output = "";
switch (opts) {
    case "-j":
        output = format_1.formatJSON(input);
        break;
    case "-x":
        output = format_1.formatXML(input);
        break;
    case "-y":
        output = format_1.formatYAML(input);
        break;
    default:
        output = input;
}
if (target) {
    fs.writeFileSync(target, output);
}
else {
    console.log(output);
}
