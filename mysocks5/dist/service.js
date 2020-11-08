"use strict";
exports.__esModule = true;
exports.preferAnother = exports.updateDomain = exports.select = exports.log = void 0;
var http = require("http");
var diskdb = require("diskdb");
var LoggerFactory = require("log4js");
exports.log = LoggerFactory.getLogger("\t\b\b\b\b\b\b\b");
exports.log.level = "debug";
var db = diskdb.connect("db", ["domains"]);
var backends = [{
        _id: 0,
        host: "127.0.0.1",
        port: 1080
    }, {
        _id: 1,
        host: "127.0.0.1",
        port: 1085
    }];
setInterval(function () {
    db.domains.find({}).forEach(function (it) {
        if (Date.now() - (it.time || 0) > 30 * 86400 * 1000) {
            db.domains.remove({ _id: it._id });
            exports.log.warn("Purge " + it.domain);
        }
    });
}, 3600 * 1000);
function select(upstream) {
    if (/\d$/.test(upstream))
        return backends[0];
    var result = db.domains.findOne({ domain: upstream });
    if (result) {
        return backends[result.prefer];
    }
    else {
        http.request("http://" + upstream, {
            method: "HEAD",
            path: "/",
            timeout: 2000
        }, function (res) {
            res.on("data", function () { });
            res.on("end", function () {
                if (res.statusCode === 200)
                    updateDomain(upstream, 0);
            });
        })
            .on("error", function (e) {
            exports.log.error("Test " + upstream + ": " + e.message);
            updateDomain(upstream, 1);
        })
            .on("timeout", function () {
            updateDomain(upstream, 1);
        })
            .end();
        return selectParent(upstream);
    }
}
exports.select = select;
function selectParent(upstream) {
    var parent = upstream.split(".").slice(1).join(".");
    var result = db.domains.findOne({ domain: parent });
    if (result) {
        return backends[result.prefer];
    }
    else {
        return backends[0];
    }
}
function updateDomain(domain, prefer) {
    db.domains.update({ domain: domain }, { domain: domain, prefer: prefer, time: Date.now() }, { upsert: true });
}
exports.updateDomain = updateDomain;
function preferAnother(domain) {
    var record = db.domains.findOne({ domain: domain });
    if (record) {
        db.domains.update({ domain: domain }, { prefer: 1 - record.prefer }, { upsert: false });
    }
}
exports.preferAnother = preferAnother;
