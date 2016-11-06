class Map<T> {
    [k: string]: T
}

interface RequestHandler {
    (req: any): any
}

interface DoneCallback {
    (resp?: any): void
}

interface FailCallback {
    (xhr?: XMLHttpRequest): void
}

interface SuccessHandler {
    (json?: any, done?: DoneCallback, fail?: FailCallback): void
}

interface FailureHandler {
    (xhr?: XMLHttpRequest, fail?: FailCallback, done?: DoneCallback): void
}

class MockHandler {
    handler: RequestHandler
    status: number

    constructor(handler: RequestHandler, status: number) {
        this.handler = handler
        this.status = status
    }
}

type HTTPMethod = "COPY" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT"

const METHODS: HTTPMethod[] = [
    "COPY",
    "DELETE",
    "GET",
    "HEAD",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

let _headers: Map<string>
let _mock: boolean = false
let _requests: Map<Map<MockHandler>>
let _success: SuccessHandler
let _failure: FailureHandler

METHODS.forEach(method => _requests[method] = new Map<MockHandler>())

function cloneJSON(json: any): any {
    if (!json) return null
    return JSON.parse(JSON.stringify(json))
}

export function setMock(flag: boolean) {
    _mock = flag
}

export function setHeaders(headers: Map<string>) {
    _headers = headers
}

export function ajaxSuccess(handler: SuccessHandler) {
    _success = handler
}

export function ajaxFailure(handler: FailureHandler) {
    _failure = handler
}

export function mock(method: HTTPMethod, url: string, handler?: RequestHandler, status?: number) {
    _requests[method][url] = {
        handler: handler || (() => ""),
        status: status || 200
    }
}

/*

function _xhr(resolve, reject, method, url, json, done, fail) {
    if (_mock) {
        var matched = url;
        // Allow regular expression; Match longer URL pattern at first;
        if (!_requests[method][url]) {
            matched = null;
            for (var k in _requests[method]){
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
                    // resolve Promise if mocked handler return a ok message;
                    resolve(response)
                    if (done) done(response);
                } else {
                    // otherwise, reject it;
                    reject({status})
                    if (fail) fail({ status: status });
                }
            }, 100);
            return true;
        }
        // if no mocked handler matched, reject the Promise as well;
        reject({status: 404, statusText: "Mock method not found"})
    }

    // Normal request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300 || status === 304) {
                var responseText = xhr.responseText;
                var response = null;
                try {
                    response = JSON.parse(responseText);
                } catch (_) {
                    response = responseText;
                }

                // Resolve the promise and use response as value for onFulfilled function;
                resolve(response)
                if (_success) {
                    _success(response, done, fail);
                } else if (done) {
                    done(response);
                }
            } else {
                if (_failure) {
                    _failure(xhr, fail, done);
                } else if (fail) {
                    fail(xhr);
                }
                // Reject the promise and use xhr as reason for onRejected function;
                reject(xhr)
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

METHODS.forEach(function (method) {
    mockxhr[method] = function (url, json, done, fail) {
        var _promise = new Promise(function(resolve, reject){
            _xhr(resolve, reject, method, url, json, done, fail);
        })
        return _promise;
    };
});


*/
