const {
	notUndef,
	notEmpty,
	inEnum,
	isMaxString,
	isMinString,
	isEmail,
	isString
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

const defaultConfig = {
	name: 'String',

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
	email: false
}

module.exports = (value, options) => {
	const config = Object.assign({}, defaultConfig, options)

	if (config.notUndef === false) {
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

	return string
}
