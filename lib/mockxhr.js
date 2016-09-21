var METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "COPY", "HEAD", "OPTIONS"];

var _headers = {};
var _mock = false;
var _requests = {};
var _success;
var _failure;
var mockxhr = {};

METHODS.map(function (method) {
    _requests[method] = {};
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
                if (url.search(k) === 0) {
                    matched = k;
                    break;
                }
            }
        }
        if (matched) {
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
            return true;
        }
    }

    // Normal request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300 || status === 304) {
                if (_success || done) {
                    var responseText = xhr.responseText;
                    var response = null;
                    try {
                        response = JSON.parse(responseText);
                    } catch (_) {
                        response = responseText;
                    }
                    if (_success) {
                        _success(response, done, fail);
                    } else {
                        done(response);
                    }
                }
            } else {
                if (_failure) {
                    _failure(xhr, fail, done);
                } else if (fail) {
                    fail(xhr);
                }
            }
        }
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    Object.keys(_headers || {}).forEach(function (k) {
        xhr.setRequestHeader(k, _headers[k]);
    });
    xhr.send(json ? JSON.stringify(json) : "");
    return false;
}

METHODS.map(function (method) {
    mockxhr[method.toLowerCase()] = function (url, json, done, fail) {
        _xhr(method, url, json, done, fail);
    };
});

mockxhr.setMock = function (flag) {
    _mock = flag;
};

mockxhr.setHeaders = function (headers) {
    // Example: { "Accept-Encoding": "gzip, deflate, sdch" }
    _headers = headers;
};

mockxhr.ajaxSuccess = function (handler) {
    _success = handler;     // function(json, done, fail)
};

mockxhr.ajaxFailure = function (handler) {
    _failure = handler;     // function(xhr, fail, done)
};

mockxhr.mock = function (method, url, handler, status) {
    _requests[method][url] = {
        handler: handler || function () {
            return "";
        },
        status: status || 200
    };
};

module.exports = mockxhr;
