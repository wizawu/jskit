"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYAML = exports.formatXML = exports.formatJSON = void 0;
var xml_js_1 = __importDefault(require("xml-js"));
var yaml_1 = __importDefault(require("yaml"));
var util_1 = require("util");
yaml_1.default.scalarOptions.str.fold.lineWidth = 120;
function formatJSON(input) {
    var json = JSON.parse(input);
    return JSON.stringify(json, null, 2);
}
exports.formatJSON = formatJSON;
function formatXML(input) {
    var xml = xml_js_1.default.xml2js(input);
    return xml_js_1.default.js2xml(xml, { spaces: 2 });
}
exports.formatXML = formatXML;
function formatYAML(input) {
    var yaml = yaml_1.default.parse(input);
    if (util_1.isArray(yaml)) {
        return yaml.map(function (obj) { return yaml_1.default.stringify([obj]); }).join("\n");
    }
    else {
        return yaml_1.default.stringify(yaml);
    }
}
exports.formatYAML = formatYAML;
