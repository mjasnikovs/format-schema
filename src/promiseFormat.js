"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateSchema_1 = __importDefault(require("./validateSchema"));
const validateInputs_1 = __importDefault(require("./validateInputs"));
exports.promiseFormat = (schema) => {
    validateSchema_1.default(schema);
    return (values) => new Promise((resolve, reject) => {
        const result = validateInputs_1.default(schema, values);
        if (result instanceof Error) {
            return reject(result);
        }
        return resolve(result);
    });
};
