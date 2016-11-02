declare module "mockxhr" {
    type HTTPMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "COPY" | "HEAD" | "OPTIONS"

    interface PlainObject {
        [propName: string]: any
    }

    interface Respond {
        status: number;
        data: PlainObject;
    }

    interface XHR{
        (url: string, json: any, done?: DoneCallback, fail?: FailCallback): void
    }

    interface DoneCallback {
        (resp?: PlainObject): void
    }

    interface FailCallback {
        (xhr?: XMLHttpRequest)
    }

    interface SuccessHandler{
        (json?:PlainObject, done?: DoneCallback, fail?: FailCallback): void
    }

    interface FailureHandler{
        (xhr?: XMLHttpRequest, fail?: FailCallback, done?: DoneCallback): void
    }

    namespace mockxhr {
        let GET: XHR;
        let POST: XHR;
        let PUT: XHR;
        let PATCH: XHR;
        let DELETE: XHR;
        let COPY: XHR;
        let HEAD: XHR;
        let OPTIONS: XHR;
        let setMock: (flag: boolean) => void;
        let setHeaders: (header: any) => void;
        let ajaxSuccess: (handler: SuccessHandler) => void;
        let ajaxFailure: (handler: FailureHandler) => void;
        let mock: (method: HTTPMethod, url: string, handler:(req: PlainObject) => PlainObject, status: number) => void;
    }

    export default mockxhr;
}

