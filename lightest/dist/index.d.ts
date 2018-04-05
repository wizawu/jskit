export interface Callback {
    (): void;
}
export declare function describe(description: string, callback: Callback): void;
export declare const before: (callback: any) => any;
export declare const after: (callback: any) => any;
export declare const beforeEach: (callback: any) => any;
export declare const afterEach: (callback: any) => any;
export declare function it(description: string, callback: Callback): void;
export declare class report {
    private static tab1;
    private static tab2;
    static toString(): string;
    static ok(): boolean;
}
