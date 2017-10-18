const {
	notUndef,
	notEmpty,
	inEnum,
	isMaxString,
	isMinString,
	isEmail,
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

	if (config.min !== false && !isNaturalNumber(config.min)) {
		throw new Error(`Format configuration error. "min" param has invalid value "${config.min}". Expected false or natural number, found "${config.min}".`)
	}

	if (config.max !== false && !isNaturalNumber(config.max)) {
		throw new Error(`Format configuration error. "max" param has invalid value "${config.max}". Expected false or natural number, found "${config.max}".`)
	}

	if (!isBoolean(config.notZero)) {
		throw new Error(`Format configuration error. "notZero" param has invalid value "${config.notZero}". Expected boolean, found "${config.notZero}".`)
	}

	if (!isBoolean(config.naturalNumber)) {
		throw new Error(`Format configuration error. "naturalNumber" param has invalid value "${config.naturalNumber}". Expected boolean, found "${config.naturalNumber}".`)
	}

	return value => integerFormat(value, config)
}
