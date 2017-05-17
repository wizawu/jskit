export interface DoneCallback {
    (resp?: any): void;
}
export interface FailCallback {
    (xhr?: XMLHttpRequest): void;
}
export interface SuccessHandler {
    (json?: any, done?: DoneCallback, fail?: FailCallback): void;
}
export interface FailureHandler {
    (xhr?: XMLHttpRequest, fail?: FailCallback, done?: DoneCallback): void;
}
export interface MockHandler {
    (req: any): any;
}
export declare type HTTPMethod = "COPY" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT";
export declare const COPY: (url: string, json: any, done?: DoneCallback | undefined, fail?: FailCallback | undefined) => void;
export declare const DELETE: (url: string, json: any, done?: DoneCallback | undefined, fail?: FailCallback | undefined) => void;
export declare const GET: (url: string, json: any, done?: DoneCallback | undefined, fail?: FailCallback | undefined) => void;
export declare const HEAD: (url: string, json: any, done?: DoneCallback | undefined, fail?: FailCallback | undefined) => void;
export declare const OPTIONS: (url: string, json: any, done?: DoneCallback | undefined, fail?: FailCallback | undefined) => void;
export declare const PATCH: (url: string, json: any, done?: DoneCallback | undefined, fail?: FailCallback | undefined) => void;
export declare const POST: (url: string, json: any, done?: DoneCallback | undefined, fail?: FailCallback | undefined) => void;
export declare const PUT: (url: string, json: any, done?: DoneCallback | undefined, fail?: FailCallback | undefined) => void;
export declare function setMock(flag: boolean): void;
export declare function setHeaders(headers: any): void;
export declare function ajaxSuccess(handler: SuccessHandler): void;
export declare function ajaxFailure(handler: FailureHandler): void;
export declare function mock(method: HTTPMethod, url: string, handler?: MockHandler, status?: number): void;
