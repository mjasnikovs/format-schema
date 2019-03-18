"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateSchema_1 = __importDefault(require("./validateSchema"));
const validateInputs_1 = __importDefault(require("./validateInputs"));
exports.format = (schema) => {
    validateSchema_1.default(schema);
    return (values) => validateInputs_1.default(schema, values);
};
