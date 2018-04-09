const {
	notUndef,
	notEmpty,
	inEnum,
	isMaxNumber,
	isMinNumber,
	notZero,
	isString,
	isFloat,
	isBoolean,
	isObject,
	isLatitude,
	isLongitude
} = require('../validators')

const {
	NAMESPACE_DEFAULT_NAME,
	OUTPUT_FORMAT_TYPE_OBJECT,
	OUTPUT_FORMAT_TYPE_PG
} = require('../types')

const defaultConfig = {
	name: NAMESPACE_DEFAULT_NAME,
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
}

const floatFormat = (value, config, outputType) => {
	if (config.notUndef === false && config.notEmpty === false) {
		if (typeof value === 'undefined') {
			return
		}
	}

	if (config.notUndef === true) {
		if (!notUndef(value)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected float, found undefined value.`)
		}
	}

	if (config.notEmpty === false) {
		if (value === null) {
			if (outputType === OUTPUT_FORMAT_TYPE_PG) {
				return {type: config.pgType, value: null}
			}
			return null
		}
	}

	if (config.notEmpty === true) {
		if (!notEmpty(value)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected non-empty float, found "${value}".`)
		}
	}

	const float = typeof value === 'number' ? value : Number(value)

	if (!isFloat(float)) {
		return new Error(`Format error. "${config.name}" has invalid value "${float}". Expected float, found "${float}".`)
	}

	if (config.notZero === true) {
		if (!notZero(float)) {
			return new Error(`Format error. "${config.name}" has invalid value "${float}". Expected non-zero float, found "${float}".`)
		}
	}

	if (config.enum !== false) {
		if (!inEnum(float, config.enum)) {
			return new Error(`Format error. "${config.name}" has invalid value "${float}". Expected one of float values "${config.enum}", found "${float}".`)
		}
	}

	if (config.max !== false) {
		if (!isMaxNumber(float, config.max)) {
			return new Error(`Format error. "${config.name}" has invalid value "${float}". Expected maximal value "${config.max}", found "${float}".`)
		}
	}

	if (config.min !== false) {
		if (!isMinNumber(float, config.min)) {
			return new Error(`Format error. "${config.name}" has invalid value "${float}". Expected minimal value "${config.min}", found "${float}".`)
		}
	}

	if (config.positive === true) {
		if (float < 0) {
			return new Error(`Format error. "${config.name}" has invalid value "${float}". Expected positve float, found "${float}".`)
		}
	}

	if (config.latitude === true) {
		if (!isLatitude(float)) {
			return new Error(`Format error. "${config.name}" has invalid value "${float}". Expected latitude, found "${float}".`)
		}
	}

	if (config.longitude === true) {
		if (!isLongitude(float)) {
			return new Error(`Format error. "${config.name}" has invalid value "${float}". Expected longitude, found "${float}".`)
		}
	}

	if (outputType === OUTPUT_FORMAT_TYPE_PG) {
		return {type: config.pgType, value: float}
	}

	return float
}

module.exports = (options = null) => {
	if (options === null) {
		return (value, outputType = OUTPUT_FORMAT_TYPE_OBJECT) =>
			floatFormat(value, defaultConfig, outputType)
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

		const invalidEnum = config.enum.find(val => isFloat(val) === false)

		if (typeof invalidEnum !== 'undefined') {
			throw new Error(`Format configuration error. "enum" param has invalid value "[${config.enum}]". Expected array with floats, found "[${config.enum}]".`)
		}
	}

	if (config.min !== false && !isFloat(config.min)) {
		throw new Error(`Format configuration error. "min" param has invalid value "${config.min}". Expected false or float, found "${config.min}".`)
	}

	if (config.max !== false && !isFloat(config.max)) {
		throw new Error(`Format configuration error. "max" param has invalid value "${config.max}". Expected false or float, found "${config.max}".`)
	}

	if (!isBoolean(config.notZero)) {
		throw new Error(`Format configuration error. "notZero" param has invalid value "${config.notZero}". Expected boolean, found "${config.notZero}".`)
	}

	if (!isBoolean(config.positive)) {
		throw new Error(`Format configuration error. "positive" param has invalid value "${config.positive}". Expected boolean, found "${config.positive}".`)
	}

	if (!isBoolean(config.latitude)) {
		throw new Error(`Format configuration error. "latitude" param has invalid value "${config.latitude}". Expected boolean, found "${config.latitude}".`)
	}

	if (!isBoolean(config.longitude)) {
		throw new Error(`Format configuration error. "longitude" param has invalid value "${config.longitude}". Expected boolean, found "${config.longitude}".`)
	}

	return (value, outputType = OUTPUT_FORMAT_TYPE_OBJECT) =>
		floatFormat(value, config, outputType)
}
