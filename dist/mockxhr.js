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

function _xhr(method, url, json, done, fail) {
    if (_mock) {
        var matched = url;
        // Allow regular expression
        if (!matched) {
            for (var k in _requests[method]) {
                if (url.search(k) >= 0) {
                    matched = k;
                    break;
                }
            }
        }
        if (matched) {
            var _ret = (function () {
                var handler = _requests[method][matched].handler;
                var response = handler ? handler(json) : undefined;
                setTimeout(function () {
                    if (done) done(response);
                }, 50);
                return {
                    v: true
                };
            })();

            if (typeof _ret === "object") return _ret.v;
        }
    }

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

mockxhr.mockxhr = function (method, url, handler) {
    _requests[method][url] = { handler: handler };
};

exports["default"] = mockxhr;
module.exports = exports["default"];
