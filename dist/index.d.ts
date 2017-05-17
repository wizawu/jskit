export declare type HTTPMethod = "COPY" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT";
export interface RequestHandler {
    (req: any): any;
}
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
export declare function setMock(flag: boolean): void;
export declare function setHeaders(headers: any): void;
export declare function ajaxSuccess(handler: SuccessHandler): void;
export declare function ajaxFailure(handler: FailureHandler): void;
export declare function mock(method: HTTPMethod, url: string, handler?: RequestHandler, status?: number): void;
