"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("./validators");
const flatenErrors = (schemaTest) => {
    if (Array.isArray(schemaTest)) {
        return schemaTest.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatenErrors(val)) : acc.concat(val), [])
            .filter((val) => val !== null);
    }
    if (schemaTest !== null) {
        return [schemaTest];
    }
    return [];
};
const validateSchema = (schema) => {
    if (Array.isArray(schema)) {
        if (schema.length === 0) {
            return new Error('Format schema error. Configuration is invalid. Expected non-empty array, found "[]".');
        }
        return schema.map(validateSchema);
    }
    if (validators_1.isObject(schema) === true) {
        if (Object.values(schema).length === 0) {
            return new Error('Format schema error. Configuration is invalid. Expected non-empty object, found "{}".');
        }
        return Object.values(schema).map(validateSchema);
    }
    if (typeof schema !== 'function') {
        return new Error(`Format schema error. Configuration is invalid. Expected function, found "${schema}".`);
    }
    return null;
};
exports.default = (schema) => {
    const test = flatenErrors(validateSchema(schema));
    if (test.length > 0) {
        throw test[0];
    }
    return null;
};
