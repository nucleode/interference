"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var httpCodes = {};
var InterferenceError = (function (_super) {
    __extends(InterferenceError, _super);
    function InterferenceError(message, type, details, code) {
        if (type === void 0) { type = 'GENERIC_ERROR'; }
        if (details === void 0) { details = {}; }
        var _this = _super.call(this, message) || this;
        Object.defineProperty(_this, 'message', {
            configurable: true,
            enumerable: false,
            value: message,
            writable: true,
        });
        Object.defineProperty(_this, 'name', {
            configurable: true,
            enumerable: false,
            value: _this.constructor.name,
            writable: true,
        });
        _this.type = type;
        _this.details = details;
        _this.statusCode = code || httpCodes[type] || 500;
        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(_this, _this.constructor);
            return _this;
        }
        Object.defineProperty(_this, 'stack', {
            configurable: true,
            enumerable: false,
            value: new Error(message).stack,
            writable: true,
        });
        return _this;
    }
    return InterferenceError;
}(Error));
var Interference = function (message, type, details, code) {
    return new InterferenceError(message, type, details, code);
};
exports.default = Interference;
exports.InjectCodes = function (codes) {
    if (codes) {
        httpCodes = codes;
    }
};
exports.getCodes = function () { return httpCodes; };
//# sourceMappingURL=index.js.map