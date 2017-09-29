const isNaturalNumber = n => typeof n === 'number' && n % 1 === 0 && Number.isInteger(n) && n >= 0

const defaultConfig = {
	name: 'Integer',

	// validate
	naturalNumber: false,
	notEmpty: false,
	notZero: false,
	min: false,
	max: false,
	require: false
}

const MAX_INT = 2147483647
const MIN_INT = -2147483648

module.exports = (value, options) => {
	const config = Object.assign({}, defaultConfig, options)

	if (value === '') {
		return new Error(`Int "${config.name}" cannot represent non 32-bit signed integer value: (empty string)`)
	}

	if (Array.isArray(value)) {
		return new Error(`Int "${config.name}" cannot represent non 32-bit signed integer value: [${String(value)}]`)
	}

	if (value === true || value === false) {
		return new Error(`Int "${config.name}" cannot represent non 32-bit signed integer value: ${String(value)}`)
	}

	if (value === null && config.notEmpty === false) {
		return null
	}

	const num = Number(value)

	if (num > MAX_INT || num < MIN_INT) {
		return new Error(`Int "${config.name}" cannot represent non 32-bit signed integer value: ${String(value)}`)
	}

	const int = Math.floor(num)

	if (int !== num) {
		return new Error(`Int "${config.name}" cannot represent non-integer value: "${String(value)}"`)
	}

	if (config.naturalNumber === true) {
		if (!isNaturalNumber(int)) {
			return new Error(`Argument "${config.name}" has invalid value "${int}". Expected natural number, found: ${int}`)
		}
	}

	if (config.notZero === true) {
		if (int === 0 || int === -0) {
			return new Error(`Argument "${config.name}" has invalid value "${int}". Expected non-zero, found: ${int}`)
		}
	}

	if (isNaturalNumber(config.min)) {
		if (int < config.min) {
			return new Error(`Argument "${config.name}" has invalid value "${int}". Expected minimum value of ${config.min}, found: ${int}`)
		}
	}

	if (isNaturalNumber(config.max)) {
		if (int > config.max) {
			return new Error(`Argument "${config.name}" has invalid value "${int}". Expected maximum value of ${config.max}, found: ${int}`)
		}
	}

	return int
}
