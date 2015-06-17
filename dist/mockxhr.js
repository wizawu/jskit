"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var METHODS = ["GET", "POST", "PUT", "DELETE"];

var mockxhr = {};
var _mock = false;
var _requests = {};

METHODS.map(function (method) {
    return _requests[method] = {};
});

function _clone(json) {
    if (!json) return {};
    return JSON.parse(JSON.stringify(json));
}

function _xhr(method, url, json, done, fail) {
    if (_mock) {
        var matched = url;
        // Allow regular expression
        if (!_requests[method][url]) {
            matched = null;
            for (var k in _requests[method]) {
                if (url.search(k) >= 0) {
                    matched = k;
                    break;
                }
            }
        }
        if (matched) {
            var _ret = (function () {
                var _requests$method$matched = _requests[method][matched];
                var status = _requests$method$matched.status;
                var handler = _requests$method$matched.handler;

                var response = handler(_clone(json));
                setTimeout(function () {
                    if (status >= 200 && status < 300 || status === 304) {
                        if (done) done(response);
                    } else {
                        if (fail) fail({ status: status });
                    }
                }, 100);
                return {
                    v: true
                };
            })();

            if (typeof _ret === "object") return _ret.v;
        }
    }

    // Normal request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var _status = xhr.status;
            if (_status >= 200 && _status < 300 || _status === 304) {
                if (!done) return;
                var responseText = xhr.responseText;
                try {
                    var response = JSON.parse(responseText);
                    done(response);
                } catch (e) {
                    console.error(e);
                    done(responseText);
                }
            } else {
                if (fail) fail(xhr);
            }
        }
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(json ? JSON.stringify(json) : "");
    return false;
}

METHODS.map(function (method) {
    mockxhr[method.toLowerCase()] = function (url, json, done, fail) {
        _xhr(method, url, json, done, fail);
    };
});

mockxhr.setMock = function (flag) {
    return _mock = flag;
};

mockxhr.mock = function (method, url, handler, status) {
    _requests[method][url] = {
        handler: handler || function () {
            return "";
        },
        status: status || 200
    };
};

exports["default"] = mockxhr;
module.exports = exports["default"];
