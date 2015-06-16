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
                var response = _requests[method][matched].handler(json);
                setTimeout(function () {
                    done(response);
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
                var responseText = xhr.responseText;
                try {
                    var response = JSON.parse(responseText);
                    done(response);
                } catch (e) {
                    console.error(e);
                    done(responseText);
                }
            } else {
                fail(xhr);
            }
        }
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(json));
    return false;
}

METHODS.map(function (method) {
    module[method] = function (url, json, done, fail) {
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
