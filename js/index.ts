class FakePromise {
    constructor(executor: any) {}
}

declare const global: any
const _Promise = global.Promise || FakePromise

namespace mockxhr {
    export type HTTPMethod = "COPY" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT"

    export interface Map<T> {
        [k: string]: T
    }

    export interface SimpleXHR {
        status: number
    }

    export interface RequestHandler {
        (req: any): any
    }

    export interface DoneCallback {
        (resp?: any): void
    }

    export interface FailCallback {
        (xhr?: XMLHttpRequest | SimpleXHR): void
    }

    export interface SuccessHandler {
        (json?: any, done?: DoneCallback, fail?: FailCallback): void
    }

    export interface FailureHandler {
        (xhr?: XMLHttpRequest, fail?: FailCallback, done?: DoneCallback): void
    }

    class MockXHR {
        handler: RequestHandler
        status: number

        constructor(handler: RequestHandler, status: number) {
            this.handler = handler
            this.status = status
        }
    }

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
    let _requests: Map<Map<MockXHR>> = {}
    let _success: SuccessHandler
    let _failure: FailureHandler

    METHODS.forEach(method => _requests[method] = {})

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
        _requests[method][url] = new MockXHR(handler || (() => ""), status || 200)
    }

    export function COPY(url: string, json: any, done?: DoneCallback, fail?: FailCallback): any {
        return new _Promise((resolve: DoneCallback, reject: FailCallback) => {
            _xhr(resolve, reject, "COPY", url, json, done, fail)
        })
    }

    export const copy = COPY

    export function DELETE(url: string, json: any, done?: DoneCallback, fail?: FailCallback): any {
        return new _Promise((resolve: DoneCallback, reject: FailCallback) => {
            _xhr(resolve, reject, "DELETE", url, json, done, fail)
        })
    }

    export function GET(url: string, json: any, done?: DoneCallback, fail?: FailCallback): any {
        return new _Promise((resolve: DoneCallback, reject: FailCallback) => {
            _xhr(resolve, reject, "GET", url, json, done, fail)
        })
    }

    export const get = GET

    export function HEAD(url: string, json: any, done?: DoneCallback, fail?: FailCallback): any {
        return new _Promise((resolve: DoneCallback, reject: FailCallback) => {
            _xhr(resolve, reject, "HEAD", url, json, done, fail)
        })
    }

    export const head = HEAD

    export function OPTIONS(url: string, json: any, done?: DoneCallback, fail?: FailCallback): any {
        return new _Promise((resolve: DoneCallback, reject: FailCallback) => {
            _xhr(resolve, reject, "OPTIONS", url, json, done, fail)
        })
    }

    export const options = OPTIONS

    export function PATCH(url: string, json: any, done?: DoneCallback, fail?: FailCallback): any {
        return new _Promise((resolve: DoneCallback, reject: FailCallback) => {
            _xhr(resolve, reject, "PATCH", url, json, done, fail)
        })
    }

    export const patch = PATCH

    export function POST(url: string, json: any, done?: DoneCallback, fail?: FailCallback): any {
        return new _Promise((resolve: DoneCallback, reject: FailCallback) => {
            _xhr(resolve, reject, "POST", url, json, done, fail)
        })
    }

    export const post = POST

    export function PUT(url: string, json: any, done?: DoneCallback, fail?: FailCallback): any {
        return new _Promise((resolve: DoneCallback, reject: FailCallback) => {
            _xhr(resolve, reject, "PUT", url, json, done, fail)
        })
    }

    export const put = PUT

    function _xhr(resolve: DoneCallback, reject: FailCallback, method: HTTPMethod, url: string, json: any,
            done: DoneCallback, fail: FailCallback) {
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
                let response = handler(cloneJSON(json))
                setTimeout(() => {
                    if (status >= 200 && status < 300 || status === 304) {
                        resolve(response)
                        if (done) done(response)
                    } else {
                        reject({status})
                        if (fail) fail({status})
                    }
                }, 100)
            } else {
                reject({status: 404, statusText: "Not Found"})
            }
        } else {
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    let status = xhr.status
                    if (status >= 200 && status < 300 || status === 304) {
                        let response: any
                        try {
                            response = JSON.parse(xhr.responseText)
                        } catch (e) {
                            response = xhr.responseText
                        }
                        resolve(response)
                        if (_success) {
                            _success(response, done, fail)
                        } else if (done) {
                            done(response)
                        }
                    } else {
                        reject(xhr)
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
    }
}

export default mockxhr
