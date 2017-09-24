const isNaturalNumber = n => typeof n === 'number' && n % 1 === 0 && Number.isInteger(n) && n >= 0

const defaultConfig = {
	name: 'Float',

	// validate
	positive: false,
	notZero: false,
	min: false,
	max: false,
	require: false,
	latitude: false,
	longitude: false
}

const MAX_INT = 2147483647
const MIN_INT = -2147483648

module.exports = (value, options) => {
	const config = Object.assign({}, defaultConfig, options)

	if (value === '') {
		return new Error(`Float "${config.name}" cannot represent non 32-bit signed value: (empty string)`)
	}

	if (Array.isArray(value)) {
		return new Error(`Float "${config.name}" cannot represent non 32-bit signed value: [${String(value)}]`)
	}

	if (value === true || value === false) {
		return new Error(`Float "${config.name}" cannot represent non 32-bit signed value: ${String(value)}`)
	}

	const num = Number(value)

	if (num > MAX_INT || num < MIN_INT) {
		return new Error(`Float "${config.name}" cannot represent non 32-bit signed value: ${String(value)}`)
	}

	const float = parseFloat(num)

	if (float !== num) {
		return new Error(`Float "${config.name}" cannot represent non-float value: "${String(value)}"`)
	}

	if (config.notZero === true) {
		if (float === 0 || float === -0) {
			return new Error(`Argument "${config.name}" has invalid value "${float}". Expected non-zero, found: ${float}`)
		}
	}

	if (isNaturalNumber(config.min)) {
		if (float < config.min) {
			return new Error(`Argument "${config.name}" has invalid value "${float}". Expected minimum value of ${config.min}, found: ${float}`)
		}
	}

	if (isNaturalNumber(config.max)) {
		if (float > config.max) {
			return new Error(`Argument "${config.name}" has invalid value "${float}". Expected maximum value of ${config.max}, found: ${float}`)
		}
	}

	if (config.latitude === true) {
		if (float < -90 || float > 90) {
			return new Error(`Argument "${config.name}" has invalid value "${float}". Expected latitude, found: ${float}`)
		}
	}

	if (config.longitude === true) {
		if (float < -180 || float > 180) {
			return new Error(`Argument "${config.name}" has invalid value "${float}". Expected longitude, found: ${float}`)
		}
	}

	if (config.positive === true) {
		if (float < 0) {
			return new Error(`Argument "${config.name}" has invalid value "${float}". Expected positive value, found: ${float}`)
		}
	}

	return float
}
