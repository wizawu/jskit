declare module "mockxhr" {
    type HTTPMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "COPY" | "HEAD" | "OPTIONS"

    type PlainObject = any;

    interface XHR{
        (url: string, json: any, done?: DoneCallback, fail?: FailCallback): PromiseLike<any>
    }

    interface DoneCallback {
        (resp?: PlainObject): void
    }

    interface FailCallback {
        (xhr?: XMLHttpRequest): void
    }

    interface SuccessHandler{
        (json?:PlainObject, done?: DoneCallback, fail?: FailCallback): void
    }

    interface FailureHandler{
        (xhr?: XMLHttpRequest, fail?: FailCallback, done?: DoneCallback): void
    }


    export let GET: XHR;
    export let POST: XHR;
    export let PUT: XHR;
    export let PATCH: XHR;
    export let DELETE: XHR;
    export let COPY: XHR;
    export let HEAD: XHR;
    export let OPTIONS: XHR;
    export let setMock: (flag: boolean) => void;
    export let setHeaders: (header: any) => void;
    export let ajaxSuccess: (handler: SuccessHandler) => void;
    export let ajaxFailure: (handler: FailureHandler) => void;
    export let mock: (method: HTTPMethod, url: string, handler:(req: PlainObject) => PlainObject, status?: number) => void;
}

