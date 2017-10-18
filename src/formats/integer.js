const {
	notUndef,
	notEmpty,
	inEnum,
	isMaxNumber,
	isMinNumber,
	notZero,
	isString,
	isInteger,
	isNaturalNumber,
	isBoolean,
	isObject
} = require('../validators')

const defaultConfig = {
	name: 'Integer',

	// validate
	notUndef: false,
	notEmpty: false,
	notZero: false,
	naturalNumber: false,
	enum: false,
	min: false,
	max: false
}

const integerFormat = (value, config) => {
	if (config.notUndef === false && config.notEmpty === false) {
		if (typeof value === 'undefined') {
			return
		}
	}

	if (config.notUndef === true) {
		if (!notUndef(value)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected integer, found undefined value.`)
		}
	}

	if (config.notEmpty === false) {
		if (value === null) {
			return null
		}
	}

	if (config.notEmpty === true) {
		if (!notEmpty(value)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected non-empty integer, found "${value}".`)
		}
	}

	if (!isInteger(value)) {
		return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected integer, found "${value}".`)
	}

	if (config.naturalNumber === true) {
		if (!isNaturalNumber(value)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected natural number, found "${value}".`)
		}
	}

	if (config.notZero === true) {
		if (!notZero(value)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected non-zero integer, found "${value}".`)
		}
	}

	if (config.enum !== false) {
		if (!inEnum(value, config.enum)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected one of integer values "${config.enum}", found "${value}".`)
		}
	}

	if (config.max !== false) {
		if (!isMaxNumber(value, config.max)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected maximal value "${config.max}", found "${value}".`)
		}
	}

	if (config.min !== false) {
		if (!isMinNumber(value, config.min)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected minimal value "${config.min}", found "${value}".`)
		}
	}

	return value
}

module.exports = (options = null) => {
	if (options === null) {
		return value => integerFormat(value, defaultConfig)
	}

	if (!isObject(options)) {
		throw new Error(`Format configuration error. Configuration is invalid. Expected object, found "${options}".`)
	}

	const config = Object.assign({}, defaultConfig, options)

	const invalidConfigKey = Object.keys(config).find(key => Object.keys(defaultConfig).indexOf(key) === -1)

	if (typeof invalidConfigKey !== 'undefined') {
		throw new Error(`Format configuration error. Configuration is invalid, param "${invalidConfigKey}" not found. Expected valid configuration object, found invalid key "${invalidConfigKey}".`)
	}

	if (!isString(config.name)) {
		throw new Error(`Format configuration error. "name" param has invalid value "${config.name}". Expected string, found "${config.name}".`)
	}

	if (!isBoolean(config.notUndef)) {
		throw new Error(`Format configuration error. "notUndef" param has invalid value "${config.notUndef}". Expected boolean, found "${config.notUndef}".`)
	}

	if (!isBoolean(config.notEmpty)) {
		throw new Error(`Format configuration error. "notEmpty" param has invalid value "${config.notEmpty}". Expected boolean, found "${config.notEmpty}".`)
	}

	if (config.enum !== false) {
		if (!Array.isArray(config.enum)) {
			throw new Error(`Format configuration error. "enum" param has invalid value "${config.enum}". Expected false or array, found "${config.enum}".`)
		}

		const invalidEnum = config.enum.find(val => isInteger(val) === false)

		if (typeof invalidEnum !== 'undefined') {
			throw new Error(`Format configuration error. "enum" param has invalid value "[${config.enum}]". Expected array with integers, found "[${config.enum}]".`)
		}
	}

	if (config.min !== false && !isInteger(config.min)) {
		throw new Error(`Format configuration error. "min" param has invalid value "${config.min}". Expected false or integer, found "${config.min}".`)
	}

	if (config.max !== false && !isInteger(config.max)) {
		throw new Error(`Format configuration error. "max" param has invalid value "${config.max}". Expected false or integer, found "${config.max}".`)
	}

	if (!isBoolean(config.notZero)) {
		throw new Error(`Format configuration error. "notZero" param has invalid value "${config.notZero}". Expected boolean, found "${config.notZero}".`)
	}

	if (!isBoolean(config.naturalNumber)) {
		throw new Error(`Format configuration error. "naturalNumber" param has invalid value "${config.naturalNumber}". Expected boolean, found "${config.naturalNumber}".`)
	}

	return value => integerFormat(value, config)
}
