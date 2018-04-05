"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockXHR = (function () {
    function MockXHR(handler, status) {
        this.handler = handler;
        this.status = status;
    }
    return MockXHR;
}());
var _mock = false;
var _headers = {};
var _requests = {};
var _success;
var _failure;
var _noRepeat = false;
var _sending = {};
exports.COPY = methodFactory("COPY");
exports.DELETE = methodFactory("DELETE");
exports.GET = methodFactory("GET");
exports.HEAD = methodFactory("HEAD");
exports.OPTIONS = methodFactory("OPTIONS");
exports.PATCH = methodFactory("PATCH");
exports.POST = methodFactory("POST");
exports.PUT = methodFactory("PUT");
function setMock(flag) {
    _mock = flag;
}
exports.setMock = setMock;
function setHeaders(headers) {
    _headers = headers;
}
exports.setHeaders = setHeaders;
function setNoRepeatedRequests(flag) {
    _noRepeat = flag;
}
exports.setNoRepeatedRequests = setNoRepeatedRequests;
function ajaxSuccess(handler) {
    _success = handler;
}
exports.ajaxSuccess = ajaxSuccess;
function ajaxFailure(handler) {
    _failure = handler;
}
exports.ajaxFailure = ajaxFailure;
function mock(method, url, handler, status) {
    _requests[method][url] = new MockXHR(handler || (function () { return ""; }), status || 200);
}
exports.mock = mock;
function _xhr(method, url, json, done, fail) {
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
            var response_1 = handler(json ? JSON.parse(JSON.stringify(json)) : null);
            return setTimeout(function () {
                if (status_1 >= 200 && status_1 < 300 || status_1 === 304) {
                    if (done)
                        done(response_1, { status: status_1 });
                }
                else {
                    if (fail)
                        fail({ status: status_1 });
                }
            }, 0);
        }
    }
    if (_noRepeat && _sending[method][url])
        return;
    _sending[method][url] = true;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            _sending[method][url] = false;
            var status_2 = xhr.status;
            if (status_2 >= 200 && status_2 < 300 || status_2 === 304) {
                var response = void 0;
                try {
                    response = JSON.parse(xhr.responseText);
                }
                catch (e) {
                    response = xhr.responseText;
                }
                if (_success) {
                    _success(response, done, fail);
                }
                else if (done) {
                    done(response, xhr);
                }
            }
            else {
                if (_failure) {
                    _failure(xhr, fail, done);
                }
                else if (fail) {
                    fail(xhr);
                }
            }
        }
    };
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    for (var k in _headers)
        xhr.setRequestHeader(k, _headers[k]);
    xhr.send(json ? JSON.stringify(json) : "");
}
function methodFactory(method) {
    _requests[method] = {};
    _sending[method] = {};
    return (function (url, json, done, fail) {
        _xhr(method, url, json, done, fail);
    });
}
