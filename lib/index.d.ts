interface Interference {
    type: string;
    statusCode: number;
    details: any;
    message: string;
}
interface Codes {
    [key: string]: number;
}
declare const Interference: (message: string, type?: string | undefined, details?: any, code?: number | undefined) => Interference;
export default Interference;
export declare const InjectCodes: (codes?: Codes | undefined) => void;
export declare const getCodes: () => Codes;
