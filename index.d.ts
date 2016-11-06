declare namespace mockxhr {
    type HTTPMethod = "COPY" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT";
    class Map<T> {
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
    function COPY(url: string, json: any, done: DoneCallback, fail: FailCallback): PromiseLike<any>;
    function DELETE(url: string, json: any, done: DoneCallback, fail: FailCallback): PromiseLike<any>;
    function GET(url: string, json: any, done: DoneCallback, fail: FailCallback): PromiseLike<any>;
    function HEAD(url: string, json: any, done: DoneCallback, fail: FailCallback): PromiseLike<any>;
    function OPTIONS(url: string, json: any, done: DoneCallback, fail: FailCallback): PromiseLike<any>;
    function PATCH(url: string, json: any, done: DoneCallback, fail: FailCallback): PromiseLike<any>;
    function POST(url: string, json: any, done: DoneCallback, fail: FailCallback): PromiseLike<any>;
    function PUT(url: string, json: any, done: DoneCallback, fail: FailCallback): PromiseLike<any>;
}
