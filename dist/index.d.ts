export interface Callback {
    (): void;
}
export declare function describe(description: string, callback: Callback): void;
export declare function it(description: string, callback: Callback): void;
export declare function before(callback: Callback): void;
export declare function after(callback: Callback): void;
export declare function beforeEach(callback: Callback): void;
export declare function afterEach(callback: Callback): void;
export declare class report {
    private static tab1(line);
    private static tab2(line);
    static toString(): string;
    static ok(): boolean;
}
