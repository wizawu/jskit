declare namespace mockxhr {
    type HTTPMethod = "COPY" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT";
    interface Map<T> {
        [k: string]: T;
    }
    interface SimpleXHR {
        status: number;
    }
    interface RequestHandler {
        (req: any): any;
    }
    interface DoneCallback {
        (resp?: any): void;
    }
    interface FailCallback {
        (xhr?: XMLHttpRequest | SimpleXHR): void;
    }
    interface SuccessHandler {
        (json?: any, done?: DoneCallback, fail?: FailCallback): void;
    }
    interface FailureHandler {
        (xhr?: XMLHttpRequest, fail?: FailCallback, done?: DoneCallback): void;
    }
    function setMock(flag: boolean): void;
    function setHeaders(headers: Map<string>): void;
    function ajaxSuccess(handler: SuccessHandler): void;
    function ajaxFailure(handler: FailureHandler): void;
    function mock(method: HTTPMethod, url: string, handler?: RequestHandler, status?: number): void;
    function COPY(url: string, json: any, done: DoneCallback, fail: FailCallback): any;
    const copy: typeof COPY;
    function DELETE(url: string, json: any, done: DoneCallback, fail: FailCallback): any;
    function GET(url: string, json: any, done: DoneCallback, fail: FailCallback): any;
    const get: typeof GET;
    function HEAD(url: string, json: any, done: DoneCallback, fail: FailCallback): any;
    const head: typeof HEAD;
    function OPTIONS(url: string, json: any, done: DoneCallback, fail: FailCallback): any;
    const options: typeof OPTIONS;
    function PATCH(url: string, json: any, done: DoneCallback, fail: FailCallback): any;
    const patch: typeof PATCH;
    function POST(url: string, json: any, done: DoneCallback, fail: FailCallback): any;
    const post: typeof POST;
    function PUT(url: string, json: any, done: DoneCallback, fail: FailCallback): any;
    const put: typeof PUT;
}
export default mockxhr;
