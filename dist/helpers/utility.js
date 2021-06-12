"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanObj = void 0;
exports.cleanObj = (obj) => {
    if (typeof obj !== 'object')
        return obj;
    for (let propName in obj) {
        if (obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
};
//# sourceMappingURL=utility.js.map