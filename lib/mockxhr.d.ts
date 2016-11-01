interface XHRCallBack{
    (resp?: any) : void
}

interface _Request{
    (url: string, json: any, done?: XHRCallBack, fail?:XHRCallBack): void
}

interface _SuccessHandler{
    (json:any, done?:XHRCallBack, fail?: XHRCallBack ): void
}

interface _FailureHandler{
    (json:any, done?:XHRCallBack, fail?: XHRCallBack ): void
}

type HTTPMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "COPY" | "HEAD" | "OPTIONS"

declare namespace _mockxhr {
    let GET: _Request;
    let POST: _Request;
    let PUT: _Request;
    let PATCH: _Request;
    let DELETE: _Request;
    let COPY: _Request;
    let HEAD: _Request;
    let OPTIONS: _Request;
    let setMock: (flag: boolean) => void;
    let setHeaders: (header: any) => void;
    let ajaxSuccess: (handler: _SuccessHandler) => void;
    let ajaxFailure: (handler: _FailureHandler) => void;
    let mock: (method: HTTPMethod, url: string, handler:() => null, status: number) => void;
}

declare module "mockxhr" {
    export default _mockxhr;
}

