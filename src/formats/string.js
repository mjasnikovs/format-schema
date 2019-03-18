"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../validators");
const sanitization_1 = require("../sanitization");
const types_1 = require("../types");
const defaultStringOptions = {
    // config
    name: types_1.NAMESPACE_DEFAULT_NAME,
    // sanitize
    trim: false,
    trimLeft: false,
    trimRight: false,
    toLowerCase: false,
    toUpperCase: false,
    truncate: false,
    capitalize: false,
    // validate
    notUndef: false,
    notEmpty: false,
    enum: false,
    min: false,
    max: false,
    email: false,
    test: false
};
const stringTest = (value, config, namespace) => {
    if (config.notUndef === false && config.notEmpty === false && typeof value === 'undefined') {
        return;
    }
    if (config.notUndef === true && validators_1.isUndefined(value)) {
        return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected string, found undefined value.`);
    }
    if (config.notEmpty === false && value === null) {
        return null;
    }
    if (config.notEmpty === true && validators_1.isEmpty(value)) {
        return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected non-empty string, found "${value}".`);
    }
    if (!validators_1.isString(value)) {
        return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected string, found "${value}".`);
    }
    if (config.max !== false && typeof config.max !== 'undefined') {
        if (!validators_1.isMaxString(value, config.max)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected maximal length of "${config.max}" characters, found "${value.length}" characters.`);
        }
    }
    if (config.min !== false && typeof config.min !== 'undefined') {
        if (!validators_1.isMinString(value, config.min)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected minimal length of "${config.min}" characters, found "${value.length}" characters.`);
        }
    }
    if (config.enum !== false && typeof config.enum !== 'undefined') {
        if (!validators_1.inEnum(value, config.enum)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected one of string values "${config.enum}", found "${value}".`);
        }
    }
    if (config.email === true) {
        if (!validators_1.isEmail(value)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected email, found "${value}".`);
        }
    }
    if (config.test !== false && typeof config.test !== 'undefined') {
        if (config.test.exec(value) === null) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected valid regular expression test (${config.test}), found "${value}".`);
        }
    }
    let string = String(value).slice(0);
    if (config.trim === true) {
        string = sanitization_1.trim(string);
    }
    if (config.trimLeft === true && config.trim === false) {
        string = sanitization_1.trimLeft(string);
    }
    if (config.trimRight === true && config.trim === false) {
        string = sanitization_1.trimRight(string);
    }
    if (config.toLowerCase === true) {
        string = sanitization_1.toLowerCase(string);
    }
    if (config.toUpperCase === true) {
        string = sanitization_1.toUpperCase(string);
    }
    if (config.truncate) {
        string = sanitization_1.truncate(string, config.truncate);
    }
    if (config.capitalize) {
        string = sanitization_1.capitalize(string, config.capitalize);
    }
    return string;
};
exports.default = (options) => {
    if (typeof options !== 'undefined' && !validators_1.isObject(options)) {
        throw new Error(`Format configuration error. Configuration is invalid. Expected object, found "${options}".`);
    }
    const config = Object.assign({}, defaultStringOptions, options);
    const invalidConfigKey = Object.keys(config).find(key => Object.keys(defaultStringOptions).indexOf(key) === -1);
    if (typeof invalidConfigKey !== 'undefined') {
        throw new Error(`Format configuration error. Configuration is invalid, param "${invalidConfigKey}" not found. Expected valid configuration object, found invalid key "${invalidConfigKey}".`);
    }
    if (!validators_1.isString(config.name)) {
        throw new Error(`Format configuration error. "name" param has invalid value "${config.name}". Expected string, found "${config.name}".`);
    }
    if (!validators_1.isBoolean(config.trim)) {
        throw new Error(`Format configuration error. "trim" param has invalid value "${config.trim}". Expected boolean, found "${config.trim}".`);
    }
    if (!validators_1.isBoolean(config.trimLeft)) {
        throw new Error(`Format configuration error. "trimLeft" param has invalid value "${config.trimLeft}". Expected boolean, found "${config.trimLeft}".`);
    }
    if (!validators_1.isBoolean(config.trimRight)) {
        throw new Error(`Format configuration error. "trimRight" param has invalid value "${config.trimRight}". Expected boolean, found "${config.trimRight}".`);
    }
    if (!validators_1.isBoolean(config.toLowerCase)) {
        throw new Error(`Format configuration error. "toLowerCase" param has invalid value "${config.toLowerCase}". Expected boolean, found "${config.toLowerCase}".`);
    }
    if (!validators_1.isBoolean(config.toUpperCase)) {
        throw new Error(`Format configuration error. "toUpperCase" param has invalid value "${config.toUpperCase}". Expected boolean, found "${config.toUpperCase}".`);
    }
    if (config.toLowerCase === true && config.toUpperCase === true) {
        throw new Error('Format configuration error. "toUpperCase" and "toLowerCase" params can\'t be true at the same time.');
    }
    if (config.truncate !== false && !validators_1.isNaturalNumber(config.truncate)) {
        throw new Error(`Format configuration error. "truncate" param has invalid value "${config.truncate}". Expected false or natural number, found "${config.truncate}".`);
    }
    if (config.capitalize !== false && typeof config.capitalize !== 'undefined' && !validators_1.inEnum(config.capitalize, ['words', 'sentences', 'first'])) {
        throw new Error(`Format configuration error. "capitalize" param has invalid value "${config.capitalize}". Expected false, "words", "sentences" or "first", found "${config.capitalize}".`);
    }
    if (!validators_1.isBoolean(config.notUndef)) {
        throw new Error(`Format configuration error. "notUndef" param has invalid value "${config.notUndef}". Expected boolean, found "${config.notUndef}".`);
    }
    if (!validators_1.isBoolean(config.notEmpty)) {
        throw new Error(`Format configuration error. "notEmpty" param has invalid value "${config.notEmpty}". Expected boolean, found "${config.notEmpty}".`);
    }
    if (config.enum !== false) {
        if (!Array.isArray(config.enum)) {
            throw new Error(`Format configuration error. "enum" param has invalid value "${config.enum}". Expected false or array, found "${config.enum}".`);
        }
        const invalidEnum = config.enum.find(val => validators_1.isString(val) === false);
        if (typeof invalidEnum !== 'undefined') {
            throw new Error(`Format configuration error. "enum" param has invalid value "[${config.enum}]". Expected array with strings, found "[${config.enum}]".`);
        }
    }
    if (config.min !== false && !validators_1.isNaturalNumber(config.min)) {
        throw new Error(`Format configuration error. "min" param has invalid value "${config.min}". Expected false or natural number, found "${config.min}".`);
    }
    if (config.max !== false && !validators_1.isNaturalNumber(config.max)) {
        throw new Error(`Format configuration error. "max" param has invalid value "${config.max}". Expected false or natural number, found "${config.max}".`);
    }
    if (!validators_1.isBoolean(config.email)) {
        throw new Error(`Format configuration error. "email" param has invalid value "${config.email}". Expected boolean, found "${config.email}".`);
    }
    if (config.test !== false && !Boolean(config.test instanceof RegExp)) {
        throw new Error(`Format configuration error. "test" param has invalid value "${config.test}". Expected false or RegExp, found "${config.test}".`);
    }
    return (value, namespace) => stringTest(value, config, namespace);
};
