const {
	notUndef,
	notEmpty,
	inEnum,
	isMaxString,
	isMinString,
	isEmail,
	isString,
	isNaturalNumber,
	isBoolean,
	isObject
} = require('../validators')

const {
	trim,
	trimLeft,
	trimRight,
	toLowerCase,
	toUpperCase,
	truncate,
	capitalize
} = require('../sanitization')

const {
	NAMESPACE_DEFAULT_NAME,
	OUTPUT_FORMAT_TYPE_OBJECT,
	OUTPUT_FORMAT_TYPE_PG
} = require('../types')

const defaultConfig = {
	name: NAMESPACE_DEFAULT_NAME,
	pgType: 'text',

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
}

const stringFormat = (value, config, outputType) => {
	if (config.notUndef === false && config.notEmpty === false) {
		if (typeof value === 'undefined') {
			return
		}
	}

	if (config.notUndef === true) {
		if (!notUndef(value)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected string, found undefined value.`)
		}
	}

	if (config.notEmpty === false) {
		if (value === null) {
			return null
		}
	}

	if (config.notEmpty === true) {
		if (!notEmpty(value)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected non-empty string, found "${value}".`)
		}
	}

	if (!isString(value)) {
		return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected string, found "${value}".`)
	}

	if (config.max !== false) {
		if (!isMaxString(value, config.max)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected maximal length of "${config.max}" characters, found "${value.length}" characters.`)
		}
	}

	if (config.min !== false) {
		if (!isMinString(value, config.min)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected minimal length of "${config.min}" characters, found "${value.length}" characters.`)
		}
	}

	if (config.enum !== false) {
		if (!inEnum(value, config.enum)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected one of string values "${config.enum}", found "${value}".`)
		}
	}

	if (config.email === true) {
		if (!isEmail(value)) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected email, found "${value}".`)
		}
	}

	if (config.test !== false) {
		if (config.test.exec(value) === null) {
			return new Error(`Format error. "${config.name}" has invalid value "${value}". Expected valid regular expression test (${config.test}), found "${value}".`)
		}
	}

	let string = String(value).slice(0)

	if (config.trim === true) {
		string = trim(string)
	}

	if (config.trimLeft === true && config.trim === false) {
		string = trimLeft(string)
	}

	if (config.trimRight === true && config.trim === false) {
		string = trimRight(string)
	}

	if (config.toLowerCase === true) {
		string = toLowerCase(string)
	}

	if (config.toUpperCase === true) {
		string = toUpperCase(string)
	}

	if (config.truncate) {
		string = truncate(string, config.truncate)
	}

	if (config.capitalize) {
		string = capitalize(string, config.capitalize)
	}

	if (outputType === OUTPUT_FORMAT_TYPE_PG) {
		return {type: config.pgType, value: string}
	}

	return string
}

module.exports = (options = null) => {
	if (options === null) {
		return (value, outputType = OUTPUT_FORMAT_TYPE_OBJECT) =>
			stringFormat(value, defaultConfig, outputType)
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

	if (!isBoolean(config.trim)) {
		throw new Error(`Format configuration error. "trim" param has invalid value "${config.trim}". Expected boolean, found "${config.trim}".`)
	}

	if (!isBoolean(config.trimLeft)) {
		throw new Error(`Format configuration error. "trimLeft" param has invalid value "${config.trimLeft}". Expected boolean, found "${config.trimLeft}".`)
	}

	if (!isBoolean(config.trimRight)) {
		throw new Error(`Format configuration error. "trimRight" param has invalid value "${config.trimRight}". Expected boolean, found "${config.trimRight}".`)
	}

	if (!isBoolean(config.toLowerCase)) {
		throw new Error(`Format configuration error. "toLowerCase" param has invalid value "${config.toLowerCase}". Expected boolean, found "${config.toLowerCase}".`)
	}

	if (!isBoolean(config.toUpperCase)) {
		throw new Error(`Format configuration error. "toUpperCase" param has invalid value "${config.toUpperCase}". Expected boolean, found "${config.toUpperCase}".`)
	}

	if (config.toLowerCase === true && config.toUpperCase === true) {
		throw new Error('Format configuration error. "toUpperCase" and "toLowerCase" params can\'t be true at the same time.')
	}

	if (config.truncate !== false && !isNaturalNumber(config.truncate)) {
		throw new Error(`Format configuration error. "truncate" param has invalid value "${config.truncate}". Expected false or natural number, found "${config.truncate}".`)
	}

	if (config.capitalize !== false && !inEnum(config.capitalize, ['words', 'sentences', 'first'])) {
		throw new Error(`Format configuration error. "capitalize" param has invalid value "${config.capitalize}". Expected false, "words", "sentences" or "first", found "${config.capitalize}".`)
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

		const invalidEnum = config.enum.find(val => isString(val) === false)

		if (typeof invalidEnum !== 'undefined') {
			throw new Error(`Format configuration error. "enum" param has invalid value "[${config.enum}]". Expected array with strings, found "[${config.enum}]".`)
		}
	}

	if (config.min !== false && !isNaturalNumber(config.min)) {
		throw new Error(`Format configuration error. "min" param has invalid value "${config.min}". Expected false or natural number, found "${config.min}".`)
	}

	if (config.max !== false && !isNaturalNumber(config.max)) {
		throw new Error(`Format configuration error. "max" param has invalid value "${config.max}". Expected false or natural number, found "${config.max}".`)
	}

	if (!isBoolean(config.email)) {
		throw new Error(`Format configuration error. "email" param has invalid value "${config.email}". Expected boolean, found "${config.email}".`)
	}

	if (config.test !== false && !Boolean(config.test instanceof RegExp)) {
		throw new Error(`Format configuration error. "test" param has invalid value "${config.test}". Expected false or RegExp, found "${config.test}".`)
	}

	return (value, outputType = OUTPUT_FORMAT_TYPE_OBJECT) =>
		stringFormat(value, config, outputType)
}
