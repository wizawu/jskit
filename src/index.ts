export interface DoneCallback {
    (resp: any): void
}

export interface FailCallback {
    (xhr: XMLHttpRequest): void
}

export interface SuccessHandler {
    (json: any, done?: DoneCallback, fail?: FailCallback): void
}

export interface FailureHandler {
    (xhr: XMLHttpRequest, fail?: FailCallback, done?: DoneCallback): void
}

export interface MockHandler {
    (req: any): any
}

class MockXHR {
    handler: MockHandler
    status: number

    constructor(handler: MockHandler, status: number) {
        this.handler = handler
        this.status = status
    }
}

let _mock: boolean = false
let _headers = {}
let _requests = {}
let _success: SuccessHandler
let _failure: FailureHandler

let _noRepeat = false
let _sending = {}

export type HTTPMethod = "COPY" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT"
export const COPY = methodFactory("COPY")
export const DELETE = methodFactory("DELETE")
export const GET = methodFactory("GET")
export const HEAD = methodFactory("HEAD")
export const OPTIONS = methodFactory("OPTIONS")
export const PATCH = methodFactory("PATCH")
export const POST = methodFactory("POST")
export const PUT = methodFactory("PUT")

export function setMock(flag: boolean) {
    _mock = flag
}

export function setHeaders(headers: any) {
    _headers = headers
}

export function setNoRepeatedRequests(flag: boolean) {
    _noRepeat = flag
}

export function ajaxSuccess(handler: SuccessHandler) {
    _success = handler
}

export function ajaxFailure(handler: FailureHandler) {
    _failure = handler
}

export function mock(method: HTTPMethod, url: string, handler?: MockHandler, status?: number) {
    _requests[method][url] = new MockXHR(handler || (() => ""), status || 200)
}

function _xhr(method: HTTPMethod, url: string, json: any, done?: DoneCallback, fail?: FailCallback) {
    if (_mock) {
        let matched = url
        if (!_requests[method][url]) {
            matched = ""
            for (let r in _requests[method]) {
                if (url.search(r) === 0) {
                    matched = r
                    break
                }
            }
        }
        if (matched) {
            let status = _requests[method][matched].status
            let handler = _requests[method][matched].handler
            let response = handler(json ? JSON.parse(JSON.stringify(json)) : null)
            return setTimeout(() => {
                if (status >= 200 && status < 300 || status === 304) {
                    if (done) done(response)
                } else {
                    if (fail) fail({ status } as any)
                }
            }, 0)
        }
    }

    if (_noRepeat && _sending[method][url]) return
    _sending[method][url] = true

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            _sending[method][url] = false
            let status = xhr.status
            if (status >= 200 && status < 300 || status === 304) {
                let response: any
                try {
                    response = JSON.parse(xhr.responseText)
                } catch (e) {
                    response = xhr.responseText
                }
                if (_success) {
                    _success(response, done, fail)
                } else if (done) {
                    done(response)
                }
            } else {
                if (_failure) {
                    _failure(xhr, fail, done)
                } else if (fail) {
                    fail(xhr)
                }
            }
        }
    }
    xhr.open(method, url, true)
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    for (let k in _headers) xhr.setRequestHeader(k, _headers[k])
    xhr.send(json ? JSON.stringify(json) : "")
}

function methodFactory(method: HTTPMethod) {
    return (
        (url: string, json?: any, done?: DoneCallback, fail?: FailCallback) => {
            _xhr(method, url, json, done, fail)
            _requests[method] = {}
            _sending[method] = {}
        }
    )
}
