"use strict";
var es6_promise_1 = require("es6-promise");
var mockxhr;
(function (mockxhr) {
    var MockXHR = (function () {
        function MockXHR(handler, status) {
            this.handler = handler;
            this.status = status;
        }
        return MockXHR;
    }());
    var METHODS = [
        "COPY",
        "DELETE",
        "GET",
        "HEAD",
        "OPTIONS",
        "PATCH",
        "POST",
        "PUT",
    ];
    var _headers;
    var _mock = false;
    var _requests;
    var _success;
    var _failure;
    METHODS.forEach(function (method) { return _requests[method] = {}; });
    function cloneJSON(json) {
        if (!json)
            return null;
        return JSON.parse(JSON.stringify(json));
    }
    function setMock(flag) {
        _mock = flag;
    }
    mockxhr.setMock = setMock;
    function setHeaders(headers) {
        _headers = headers;
    }
    mockxhr.setHeaders = setHeaders;
    function ajaxSuccess(handler) {
        _success = handler;
    }
    mockxhr.ajaxSuccess = ajaxSuccess;
    function ajaxFailure(handler) {
        _failure = handler;
    }
    mockxhr.ajaxFailure = ajaxFailure;
    function mock(method, url, handler, status) {
        _requests[method][url] = new MockXHR(handler || (function () { return ""; }), status || 200);
    }
    mockxhr.mock = mock;
    function COPY(url, json, done, fail) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            _xhr(resolve, reject, "COPY", url, json, done, fail);
        });
    }
    mockxhr.COPY = COPY;
    function DELETE(url, json, done, fail) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            _xhr(resolve, reject, "DELETE", url, json, done, fail);
        });
    }
    mockxhr.DELETE = DELETE;
    function GET(url, json, done, fail) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            _xhr(resolve, reject, "GET", url, json, done, fail);
        });
    }
    mockxhr.GET = GET;
    function HEAD(url, json, done, fail) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            _xhr(resolve, reject, "HEAD", url, json, done, fail);
        });
    }
    mockxhr.HEAD = HEAD;
    function OPTIONS(url, json, done, fail) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            _xhr(resolve, reject, "OPTIONS", url, json, done, fail);
        });
    }
    mockxhr.OPTIONS = OPTIONS;
    function PATCH(url, json, done, fail) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            _xhr(resolve, reject, "PATCH", url, json, done, fail);
        });
    }
    mockxhr.PATCH = PATCH;
    function POST(url, json, done, fail) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            _xhr(resolve, reject, "POST", url, json, done, fail);
        });
    }
    mockxhr.POST = POST;
    function PUT(url, json, done, fail) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            _xhr(resolve, reject, "PUT", url, json, done, fail);
        });
    }
    mockxhr.PUT = PUT;
    function _xhr(resolve, reject, method, url, json, done, fail) {
        if (_mock) {
            var matched = url;
            if (!_requests[method][url]) {
                matched = "";
                for (var r in _requests[method]) {
                    if (url.search(r) === 0) {
                        matched = r;
                        break;
                    }
                }
            }
            if (matched) {
                var status_1 = _requests[method][matched].status;
                var handler = _requests[method][matched].handler;
                var response_1 = handler(cloneJSON(json));
                setTimeout(function () {
                    if (status_1 >= 200 && status_1 < 300 || status_1 === 304) {
                        resolve(response_1);
                        if (done)
                            done(response_1);
                    }
                    else {
                        reject({ status: status_1 });
                        if (fail)
                            fail({ status: status_1 });
                    }
                }, 100);
            }
            else {
                reject({ status: 404, statusText: "Not Found" });
            }
        }
        else {
            var xhr_1 = new XMLHttpRequest();
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState === 4) {
                    var status_2 = xhr_1.status;
                    if (status_2 >= 200 && status_2 < 300 || status_2 === 304) {
                        var response = void 0;
                        try {
                            response = JSON.parse(xhr_1.responseText);
                        }
                        catch (e) {
                            response = xhr_1.responseText;
                        }
                        resolve(response);
                        if (_success) {
                            _success(response, done, fail);
                        }
                        else if (done) {
                            done(response);
                        }
                    }
                    else {
                        reject(xhr_1);
                        if (_failure) {
                            _failure(xhr_1, fail, done);
                        }
                        else if (fail) {
                            fail(xhr_1);
                        }
                    }
                }
            };
            xhr_1.open(method, url, true);
            xhr_1.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            Object.keys(_headers || {}).forEach(function (k) { return xhr_1.setRequestHeader(k, _headers[k]); });
            xhr_1.send(json ? JSON.stringify(json) : "");
        }
    }
})(mockxhr || (mockxhr = {}));
