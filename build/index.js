"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let httpCodes = {};
class InterferenceError extends Error {
    constructor(message, type = 'GENERIC_ERROR', details = {}, code) {
        super(message);
        Object.defineProperty(this, 'message', {
            configurable: true,
            enumerable: false,
            value: message,
            writable: true,
        });
        Object.defineProperty(this, 'name', {
            configurable: true,
            enumerable: false,
            value: this.constructor.name,
            writable: true,
        });
        this.type = type;
        this.details = details;
        this.statusCode = code || httpCodes[type] || 500;
        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
            return;
        }
        Object.defineProperty(this, 'stack', {
            configurable: true,
            enumerable: false,
            value: new Error(message).stack,
            writable: true,
        });
    }
}
const Interference = (message, type, details, code) => new InterferenceError(message, type, details, code);
exports.default = Interference;
exports.InjectCodes = (codes) => {
    if (codes) {
        httpCodes = codes;
    }
};
exports.getCodes = () => httpCodes;
//# sourceMappingURL=index.js.map