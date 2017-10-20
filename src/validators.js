const {
	MAX_INT,
	MIN_INT
} = require('./types')

// not typeof undefined
const notUndef = input => typeof input !== 'undefined'

// not null, '', typeof undefined
const notEmpty = input => {
	return input !== null && typeof input !== 'undefined' && input !== ''
}

// not 0, -1
const notZero = input => input !== 0 && 1 / input !== -Infinity

// is email
const isEmail = input => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).exec(input) !== null

// is natural number 
const isNaturalNumber = input => {
	return typeof input === 'number' && input % 1 === 0 && Number.isInteger(input) && input >= 0 && 1 / input !== -Infinity
}

// is integer
const isInteger = input => {
	if (!Number.isInteger(input)) {
		return false
	}

	if (Array.isArray(input) || typeof input !== 'number' || Number(input) !== input) {
		return false
	}

	if (input !== Math.floor(input) || input === Infinity || isNaN(input)) {
		return false
	}

	if (input > MAX_INT || input < MIN_INT) {
		return false
	}
	return true
}

const isFloat = input => {
	if (Array.isArray(input) || typeof input !== 'number' || Number(input) !== input) {
		return false
	}

	if (input !== parseFloat(input) || input === Infinity || isNaN(input)) {
		return false
	}

	if (input > MAX_INT || input < MIN_INT) {
		return false
	}
	return true
}

const isString = input => {
	if (Array.isArray(input) || typeof input !== 'string') {
		return false
	}

	return true
}

const isBoolean = input => {
	return input === true || input === false
}

const isLatitude = input => {
	return input > -90 && input < 90 && typeof input === 'number'
}

const isLongitude = input => {
	return input > -180 && input < 180 && typeof input === 'number'
}

const isMaxNumber = (input, n) => {
	return input <= n
}

const isMinNumber = (input, n) => {
	return input >= n
}

const isMaxString = (input, n) => {
	return input.length <= n
}

const isMinString = (input, n) => {
	return input.length >= n
}

const inEnum = (input, array) => {
	return array.indexOf(input) !== -1
}

const isObject = object => {
	return typeof object === 'object' && object !== null && !Array.isArray(object) && object === Object(object)
}

const validateSchema = schema => {
	if (!Array.isArray(schema) && !isObject(schema)) {
		if (typeof schema !== 'function') {
			return new Error(`Format schema error. Configuration is invalid. Expected functions, found "${schema}".`)
		}

		return null
	}

	if (Array.isArray(schema)) {
		if (schema.length === 0) {
			return new Error('Format schema error. Configuration is invalid. Expected non-empty array, found "[]".')
		}
		return schema.map(validateSchema)
	}

	if (isObject(schema)) {
		if (Object.keys(schema).length === 0) {
			return new Error('Format schema error. Configuration is invalid. Expected non-empty object, found "{}".')
		}

		return Object.keys(schema).map(key => validateSchema(schema[key]))
	}

	throw new Error(`Format schema error. Configuration is invalid. Found "${schema}".`)
}

module.exports = {
	notUndef,
	notEmpty,
	notZero,
	isEmail,
	isNaturalNumber,
	isInteger,
	isFloat,
	isString,
	isBoolean,
	isLatitude,
	isLongitude,
	isMaxNumber,
	isMinNumber,
	isMaxString,
	isMinString,
	inEnum,
	isObject,
	validateSchema
}
