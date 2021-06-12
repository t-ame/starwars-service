"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAnonymousComment = void 0;
const express_validator_1 = require("express-validator");
const Validator_1 = require("./Validator");
exports.validateAnonymousComment = () => {
    return Validator_1.Validator.validate([
        express_validator_1.body('comment', 'Provide a valid comment, must be between 1 and 500 characters long.').isLength({
            min: 1,
            max: 500,
        }),
    ]);
};
//# sourceMappingURL=comments.js.map