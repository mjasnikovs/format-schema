"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("./validators");
const validateInputs = (schema, input, namespace) => {
    if (Array.isArray(schema)) {
        if (schema.length === 1) {
            if (Array.isArray(input)) {
                if (input.length === 0) {
                    const result = validateInputs(schema[0], undefined, namespace ? `${namespace}[0]` : `[0]`);
                    if (result instanceof Error) {
                        return result;
                    }
                    return [];
                }
                return input.reduce((all, _, index, output) => {
                    const result = validateInputs(schema[0], input[index] || undefined, namespace ? `${namespace}[${index}]` : `[${index}]`);
                    if (result instanceof Error) {
                        output.splice(index); // break;
                        return result;
                    }
                    all[index] = result;
                    return all;
                }, []);
            }
            const result = validateInputs(schema[0], undefined, namespace);
            if (result instanceof Error) {
                return new Error(`Format error. "${namespace}" has invalid value "${input}". Expected array, found "${input}".`);
            }
            return [];
        }
        else if (schema.length > 1) {
            return schema.reduce((all, _, index, output) => {
                const result = validateInputs(schema[index], input[index], namespace ? `${namespace}[${index}]` : `[${index}]`);
                if (result instanceof Error) {
                    output.splice(index); // break;
                    return result;
                }
                all[index] = result;
                return all;
            }, []);
        }
        return [];
    }
    if (validators_1.isObject(schema)) {
        return Object.keys(schema)
            .reduce((all, key, index, output) => {
            const result = validateInputs(schema[key], input ? input[key] : undefined, key);
            if (result instanceof Error) {
                output.splice(index); // break;
                return result;
            }
            all[key] = result;
            return all;
        }, {});
    }
    return schema(input, namespace);
};
exports.default = validateInputs;
