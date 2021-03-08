"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYAML = exports.formatXML = exports.formatJSON = void 0;
var xml_js_1 = __importDefault(require("xml-js"));
var yaml_1 = __importDefault(require("yaml"));
function sortObject(doc) {
    if (typeof doc !== "object")
        return doc;
    if (Array.isArray(doc))
        return doc.map(function (it) { return sortObject(it); });
    return Object.keys(doc).sort().reduce(function (res, k) {
        if (typeof doc[k] === "object") {
            res[k] = sortObject(doc[k]);
        }
        else {
            res[k] = doc[k];
        }
        return res;
    }, {});
}
function formatJSON(input, sorted) {
    if (sorted === void 0) { sorted = false; }
    var doc = JSON.parse(input);
    if (sorted)
        doc = sortObject(doc);
    return JSON.stringify(doc, null, 2) + "\n";
}
exports.formatJSON = formatJSON;
function formatXML(input) {
    var doc = xml_js_1.default.xml2js(input);
    return xml_js_1.default.js2xml(doc, { spaces: 2 }) + "\n";
}
exports.formatXML = formatXML;
function formatYAML(input, lineWidth) {
    if (lineWidth === void 0) { lineWidth = 80; }
    yaml_1.default.scalarOptions.str.fold.lineWidth = lineWidth;
    var doc = yaml_1.default.parseDocument(input, { indent: 2, schema: "yaml-1.1" });
    return doc.toString();
}
exports.formatYAML = formatYAML;
