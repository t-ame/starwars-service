"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanObj = void 0;
const cleanObj = (obj) => {
    if (typeof obj !== 'object')
        return obj;
    for (let propName in obj) {
        if (obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
};
exports.cleanObj = cleanObj;
//# sourceMappingURL=utility.js.map