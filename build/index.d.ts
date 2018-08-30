interface Interference {
    type: string;
    statusCode: number;
    details: any;
    message: string;
}
interface Codes {
    [key: string]: number;
}
declare class Interference extends Error implements Interference {
    type: string;
    statusCode: number;
    details: any;
    message: string;
    constructor(message: string, type?: string, details?: any, code?: number);
}
declare const _default: (message: string, type?: string | undefined, details?: any, code?: number | undefined) => Interference;
export default _default;
export declare const InjectCodes: (codes?: Codes | undefined) => void;
export declare const getCodes: () => Codes;
