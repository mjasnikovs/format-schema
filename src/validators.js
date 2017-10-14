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
const notZero = input => input !== 0 && input !== -0

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
	isLongitude
}
