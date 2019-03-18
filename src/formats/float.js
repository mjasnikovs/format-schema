"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../validators");
const types_1 = require("../types");
const defaultFloatOptions = {
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
    latitude: false,
    longitude: false
};
const defaultConfig = {
    name: types_1.NAMESPACE_DEFAULT_NAME,
    pgType: 'numeric',
    // validate
    notUndef: false,
    notEmpty: false,
    notZero: false,
    enum: false,
    min: false,
    max: false,
    positive: false,
    latitude: false,
    longitude: false
};
const floatTest = (value, config, namespace) => {
    if (config.notUndef === false && config.notEmpty === false) {
        if (typeof value === 'undefined') {
            return;
        }
    }
    if (config.notUndef === true) {
        if (validators_1.isUndefined(value)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected float, found undefined value.`);
        }
    }
    if (config.notEmpty === false && value === null) {
        return null;
    }
    if (config.notEmpty === true) {
        if (validators_1.isEmpty(value)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected non-empty float, found "${value}".`);
        }
    }
    const float = typeof value === 'number' ? value : Number(value);
    if (!validators_1.isFloat(float)) {
        return new Error(`Format error. "${namespace || config.name}" has invalid value "${float}". Expected float, found "${float}".`);
    }
    if (config.notZero === true) {
        if (validators_1.isZero(float)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${float}". Expected non-zero float, found "${float}".`);
        }
    }
    if (config.enum !== false && typeof config.enum !== 'undefined') {
        if (!validators_1.inEnum(float, config.enum)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${float}". Expected one of float values "${config.enum}", found "${float}".`);
        }
    }
    if (config.max !== false && typeof config.max !== 'undefined') {
        if (!validators_1.isMaxNumber(float, config.max)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${float}". Expected maximal value "${config.max}", found "${float}".`);
        }
    }
    if (config.min !== false && typeof config.min !== 'undefined') {
        if (!validators_1.isMinNumber(float, config.min)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${float}". Expected minimal value "${config.min}", found "${float}".`);
        }
    }
    if (config.positive === true) {
        if (float < 0) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${float}". Expected positive float, found "${float}".`);
        }
    }
    if (config.latitude === true) {
        if (!validators_1.isLatitude(float)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${float}". Expected latitude, found "${float}".`);
        }
    }
    if (config.longitude === true) {
        if (!validators_1.isLongitude(float)) {
            return new Error(`Format error. "${namespace || config.name}" has invalid value "${float}". Expected longitude, found "${float}".`);
        }
    }
    return float;
};
exports.default = (options) => {
    if (typeof options !== 'undefined' && !validators_1.isObject(options)) {
        throw new Error(`Format configuration error. Configuration is invalid. Expected object, found "${options}".`);
    }
    const config = Object.assign({}, defaultFloatOptions, options);
    const invalidConfigKey = Object.keys(config).find(key => Object.keys(defaultFloatOptions).indexOf(key) === -1);
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
        const invalidEnum = config.enum.find(val => validators_1.isFloat(val) === false);
        if (typeof invalidEnum !== 'undefined') {
            throw new Error(`Format configuration error. "enum" param has invalid value "[${config.enum}]". Expected array with floats, found "[${config.enum}]".`);
        }
    }
    if (config.min !== false && !validators_1.isFloat(config.min)) {
        throw new Error(`Format configuration error. "min" param has invalid value "${config.min}". Expected false or float, found "${config.min}".`);
    }
    if (config.max !== false && !validators_1.isFloat(config.max)) {
        throw new Error(`Format configuration error. "max" param has invalid value "${config.max}". Expected false or float, found "${config.max}".`);
    }
    if (!validators_1.isBoolean(config.notZero)) {
        throw new Error(`Format configuration error. "notZero" param has invalid value "${config.notZero}". Expected boolean, found "${config.notZero}".`);
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
    return (value, namespace) => floatTest(value, config, namespace);
};
