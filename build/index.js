"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let httpCodes = {};
class Interference extends Error {
    constructor(message, type = 'GENERIC_ERROR', details = {}, code = 500) {
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
        this.statusCode = httpCodes[code] || code;
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
exports.default = (message, type, details, code) => new Interference(message, type, details, code);
exports.InjectCodes = (codes) => {
    if (codes) {
        httpCodes = codes;
    }
};
exports.getCodes = () => httpCodes;
//# sourceMappingURL=index.js.map