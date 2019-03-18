"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { NAMESPACE_DEFAULT_NAME } = require('../types');
const validators_1 = require("../validators");
const defaultBooleanOptions = {
    // config
    name: NAMESPACE_DEFAULT_NAME,
    // validate
    notUndef: false,
    notEmpty: false
};
const booleanTest = (value, config, namespace) => {
    if (config.notUndef === false && config.notEmpty === false) {
        if (typeof value === 'undefined') {
            return;
        }
    }
    if (config.notUndef === true) {
        if (validators_1.isUndefined(value)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected boolean, found undefined value.`);
        }
    }
    if (config.notEmpty === false && value === null) {
        return null;
    }
    if (config.notEmpty === true) {
        if (validators_1.isEmpty(value)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected non-empty boolean, found "${value}".`);
        }
    }
    if (!validators_1.isBoolean(value)) {
        return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected boolean, found "${value}".`);
    }
    return value;
};
exports.default = (options) => {
    if (typeof options !== 'undefined' && !validators_1.isObject(options)) {
        throw new Error(`Format configuration error. Configuration is invalid. Expected object, found "${options}".`);
    }
    const config = Object.assign({}, defaultBooleanOptions, options);
    const invalidConfigKey = Object.keys(config).find(key => Object.keys(defaultBooleanOptions).indexOf(key) === -1);
    if (typeof invalidConfigKey !== 'undefined') {
        throw new Error(`Format configuration error. Configuration is invalid, param "${invalidConfigKey}" not found. Expected valid configuration object, found invalid key "${invalidConfigKey}".`);
    }
    if (!validators_1.isString(config.name)) {
        throw new Error(`Format configuration error. "name" param has invalid value "${config.name}". Expected string, found "${config.name}".`);
    }
    if (!validators_1.isBoolean(config.notUndef)) {
        throw new Error(`Format configuration error. "notUndef" param has invalid value "${config.notUndef}". Expected boolean, found "${config.notUndef}".`);
    }
    if (!validators_1.isBoolean(config.notEmpty)) {
        throw new Error(`Format configuration error. "notEmpty" param has invalid value "${config.notEmpty}". Expected boolean, found "${config.notEmpty}".`);
    }
    return (value, namespace) => booleanTest(value, config, namespace);
};
