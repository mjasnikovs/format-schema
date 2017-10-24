const {
	NAMESPACE_DEFAULT_NAME,
	OUTPUT_FORMAT_TYPE_OBJECT,
	OUTPUT_FORMAT_TYPE_PG
} = require('../types')

const {
	notUndef,
	notEmpty,
	isString,
	isBoolean,
	isObject
} = require('../validators')

const defaultConfig = {
	name: NAMESPACE_DEFAULT_NAME,
	pgType: 'boolean',

	// validate
	notUndef: false,
	notEmpty: false
}

const booleanFormat = (value, config, outputType) => {
	if (config.notUndef === false && config.notEmpty === false) {
		if (typeof value === 'undefined') {
			return
		}
	}

	if (config.notUndef === true) {
		if (!notUndef(value)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected boolean, found undefined value.`)
		}
	}

	if (config.notEmpty === false) {
		if (value === null) {
			return null
		}
	}

	if (config.notEmpty === true) {
		if (!notEmpty(value)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected non-empty boolean, found "${value}".`)
		}
	}

	if (!isBoolean(value)) {
		return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected boolean, found "${value}".`)
	}

	if (outputType === OUTPUT_FORMAT_TYPE_PG) {
		return {type: config.pgType, value}
	}

	return value
}

module.exports = (options = null) => {
	if (options === null) {
		return (value, outputType = OUTPUT_FORMAT_TYPE_OBJECT) =>
			booleanFormat(value, defaultConfig, outputType)
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

	return (value, outputType = OUTPUT_FORMAT_TYPE_OBJECT) =>
		booleanFormat(value, config, outputType)
}
