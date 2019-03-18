"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.isUndefined = (input) => typeof input === 'undefined';
// compatibility
exports.notUndef = (input) => !exports.isUndefined(input);
exports.isEmpty = (input) => input === null || typeof input === 'undefined' || input === '';
// compatibility
exports.notEmpty = (input) => !exports.isEmpty(input);
// compatibility
exports.notZero = (input) => input !== 0 && 1 / input !== -Infinity;
exports.isZero = (input) => !exports.notZero(input);
exports.isEmail = (input) => typeof input === 'string' && (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).exec(input) !== null;
exports.isNaturalNumber = (input) => typeof input === 'number' && input % 1 === 0 && Number.isInteger(input) && input >= 0 && 1 / input !== -Infinity;
exports.isInteger = (input) => {
    if (typeof input !== 'number' || Number(input) !== input) {
        return false;
    }
    if (!Number.isInteger(input)) {
        return false;
    }
    if (input > types_1.MAX_INT || input < types_1.MIN_INT) {
        return false;
    }
    return true;
};
exports.isFloat = (input) => {
    if (typeof input !== 'number' || Number(input) !== input) {
        return false;
    }
    if (input > types_1.MAX_INT || input < types_1.MIN_INT) {
        return false;
    }
    return true;
};
exports.isString = (input) => typeof input === 'string';
exports.isBoolean = (input) => input === true || input === false;
exports.isObject = (input) => typeof input === 'object' && input !== null && !Array.isArray(input) && input === Object(input);
// Helpers
exports.isLatitude = (input) => input >= -90 && input <= 90 && typeof input === 'number';
exports.isLongitude = (input) => input >= -180 && input <= 180 && typeof input === 'number';
exports.isMaxNumber = (input, n) => input <= n;
exports.isMinNumber = (input, n) => input >= n;
exports.isMaxString = (input, n) => input.length <= n;
exports.isMinString = (input, n) => input.length >= n;
exports.inEnum = (input, array) => array.indexOf(input) !== -1;
