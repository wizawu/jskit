"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYAML = exports.formatXML = exports.formatJSON = void 0;
var xml_js_1 = __importDefault(require("xml-js"));
var yaml_1 = __importDefault(require("yaml"));
function formatJSON(input) {
    var doc = JSON.parse(input);
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
