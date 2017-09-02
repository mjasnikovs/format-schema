const defaultConfig = {
	name: 'Boolean',

	// validate
	require: false
}

module.exports = (value, options) => {
	const config = Object.assign({}, defaultConfig, options)

	if (Array.isArray(value)) {
		return new Error(`Argument "${config.name}" cannot represent boolean value. Expected boolean, found: [${String(value)}]`)
	}

	if (value !== true && value !== false || value !== Boolean(value)) {
		return new Error(`Argument "${config.name}" has invalid value "${value}". Expected boolean, found: ${value}`)
	}


	return value
}
