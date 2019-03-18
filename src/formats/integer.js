"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../validators");
const types_1 = require("../types");
const defaultIntegerOptions = {
    // config
    name: types_1.NAMESPACE_DEFAULT_NAME,
    // validate
    notUndef: false,
    notEmpty: false,
    notZero: false,
    enum: false,
    min: false,
    max: false,
    positive: false,
    naturalNumber: false,
    latitude: false,
    longitude: false
};
const integerTest = (value, config, namespace) => {
    if (config.notUndef === false && config.notEmpty === false) {
        if (typeof value === 'undefined') {
            return;
        }
    }
    if (config.notUndef === true) {
        if (validators_1.isUndefined(value)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected integer, found undefined value.`);
        }
    }
    if (config.notEmpty === false && value === null) {
        return null;
    }
    if (config.notEmpty === true && validators_1.isEmpty(value)) {
        return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected non-empty integer, found "${value}".`);
    }
    const integer = typeof value === 'number' ? value : Number(value);
    if (!validators_1.isInteger(integer)) {
        return new Error(`Format error. "${namespace || config.name}" has invalid value "${integer}". Expected integer, found "${integer}".`);
    }
    if (config.naturalNumber === true) {
        if (!validators_1.isNaturalNumber(integer)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${integer}". Expected natural number, found "${integer}".`);
        }
    }
    if (config.notZero === true) {
        if (validators_1.isZero(integer)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${integer}". Expected non-zero integer, found "${integer}".`);
        }
    }
    if (config.enum !== false && typeof config.enum !== 'undefined') {
        if (!validators_1.inEnum(integer, config.enum)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${integer}". Expected one of integer values "${config.enum}", found "${integer}".`);
        }
    }
    if (config.max !== false && typeof config.max !== 'undefined') {
        if (!validators_1.isMaxNumber(integer, config.max)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${integer}". Expected maximal value "${config.max}", found "${integer}".`);
        }
    }
    if (config.min !== false && typeof config.min !== 'undefined') {
        if (!validators_1.isMinNumber(integer, config.min)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${integer}". Expected minimal value "${config.min}", found "${integer}".`);
        }
    }
    if (config.positive === true) {
        if (integer < 0) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${integer}". Expected positive float, found "${integer}".`);
        }
    }
    if (config.latitude === true) {
        if (!validators_1.isLatitude(integer)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${integer}". Expected latitude, found "${integer}".`);
        }
    }
    if (config.longitude === true) {
        if (!validators_1.isLongitude(integer)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${integer}". Expected longitude, found "${integer}".`);
        }
    }
    return integer;
};
exports.default = (options) => {
    if (typeof options !== 'undefined' && !validators_1.isObject(options)) {
        throw new Error(`Format configuration error. Configuration is invalid. Expected object, found "${options}".`);
    }
    const config = Object.assign({}, defaultIntegerOptions, options);
    const invalidConfigKey = Object.keys(config).find(key => Object.keys(defaultIntegerOptions).indexOf(key) === -1);
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
    if (config.enum !== false) {
        if (!Array.isArray(config.enum)) {
            throw new Error(`Format configuration error. "enum" param has invalid value "${config.enum}". Expected false or array, found "${config.enum}".`);
        }
        const invalidEnum = config.enum.find(val => validators_1.isInteger(val) === false);
        if (typeof invalidEnum !== 'undefined') {
            throw new Error(`Format configuration error. "enum" param has invalid value "[${config.enum}]". Expected array with integers, found "[${config.enum}]".`);
        }
    }
    if (config.min !== false && !validators_1.isInteger(config.min)) {
        throw new Error(`Format configuration error. "min" param has invalid value "${config.min}". Expected false or integer, found "${config.min}".`);
    }
    if (config.max !== false && !validators_1.isInteger(config.max)) {
        throw new Error(`Format configuration error. "max" param has invalid value "${config.max}". Expected false or integer, found "${config.max}".`);
    }
    if (!validators_1.isBoolean(config.notZero)) {
        throw new Error(`Format configuration error. "notZero" param has invalid value "${config.notZero}". Expected boolean, found "${config.notZero}".`);
    }
    if (!validators_1.isBoolean(config.naturalNumber)) {
        throw new Error(`Format configuration error. "naturalNumber" param has invalid value "${config.naturalNumber}". Expected boolean, found "${config.naturalNumber}".`);
    }
    if (!validators_1.isBoolean(config.positive)) {
        throw new Error(`Format configuration error. "positive" param has invalid value "${config.positive}". Expected boolean, found "${config.positive}".`);
    }
    if (!validators_1.isBoolean(config.latitude)) {
        throw new Error(`Format configuration error. "latitude" param has invalid value "${config.latitude}". Expected boolean, found "${config.latitude}".`);
    }
    if (!validators_1.isBoolean(config.longitude)) {
        throw new Error(`Format configuration error. "longitude" param has invalid value "${config.longitude}". Expected boolean, found "${config.longitude}".`);
    }
    return (value, namespace) => integerTest(value, config, namespace);
};
