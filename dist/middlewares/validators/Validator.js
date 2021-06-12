"use strict";
/* istanbul ignore file */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const express_validator_1 = require("express-validator");
const constants_1 = require("../../constants");
/**
 * Uniform handling of express validators
 * @param validations
 */
exports.Validator = {
    validate: (validations) => {
        return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            yield Promise.all(validations.map((validation) => validation.run(req)));
            const errors = express_validator_1.validationResult(req);
            if (errors.isEmpty())
                return next();
            res.status(400).json({
                code: constants_1.ErrorCode.BAD_REQUEST,
                errors: errors
                    .array()
                    .map(({ param, msg }) => `${param}: ${msg}`)
                    .join(', '),
            });
        });
    },
};
//# sourceMappingURL=Validator.js.map