const isNaturalNumber = n => typeof n === 'number' && n % 1 === 0 && Number.isInteger(n) && n >= 0

const wordRegex = /(?:^|\s)\S/g
const sentenceRegex = /(?:^|\.\s)\S/g

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
	notEmpty: false,
	min: false,
	max: false,
	email: false,
	require: false
}

module.exports = (value, options) => {
	const config = Object.assign({}, defaultConfig, options)

	if (Array.isArray(value)) {
		return new Error(`Argument "${config.name}" cannot represent an array value: [${String(value)}]`)
	}

	let str = ''

	if (value === null && config.notEmpty === false) {
		return null
	} else if (value === null) {
		str = ''
	} else {
		str = String(value).slice(0)
	}

	// sanitize
	if (config.trim === true) {
		str = str.trim()
	}

	if (config.trimLeft === true) {
		str = str.trimLeft()
	}

	if (config.trimRight === true) {
		str = str.trimRight()
	}

	if (config.toLowerCase === true) {
		str = str.toLowerCase()
	}

	if (config.toUpperCase === true) {
		str = str.toUpperCase()
	}

	if (isNaturalNumber(config.truncate)) {
		str = str.slice(0, config.truncate)
	}

	if (['words', 'sentences', 'first'].indexOf(config.capitalize) !== -1) {
		if (config.capitalize === 'words') {
			str = str.replace(wordRegex, s => s.toUpperCase())
		} else if (config.capitalize === 'sentences') {
			str = str.replace(sentenceRegex, s => s.toUpperCase())
		} else if (config.capitalize === 'first') {
			str = str[0].toUpperCase() + str.slice(1)
		}
	}

	// validate
	if (config.notEmpty === true) {
		if (str === '') {
			return new Error(`Argument "${config.name}" has invalid value "${str}". Expected not-empty string, found "${str}".`)
		}
	}

	if (isNaturalNumber(config.min)) {
		if (str.length < config.min) {
			return new Error(`Argument "${config.name}" has invalid value "${str}". Expected minimum length of ${config.min} characters, found "${str.length}".`)
		}
	}

	if (isNaturalNumber(config.max)) {
		if (str.length > config.max) {
			return new Error(`Argument "${config.name}" has invalid value "${str}". Expected maximum length of ${config.max} characters, found "${str.length}".`)
		}
	}

	if (config.notEmpty === true && config.email === true || str && config.email === true) {
		if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.exec(str) === null) {
			return new Error(`Argument "${config.name}" has invalid value "${str}". Expected valid email, found "${str}".`)
		}
	}

	return str
}
