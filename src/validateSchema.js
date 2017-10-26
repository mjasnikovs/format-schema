const {
	isObject
} = require('./validators')

const flatenErrors = errors => {
	if (Array.isArray(errors)) {
		return errors
			.reduce((all, val) => {
				if (Array.isArray(val)) {
					return [...all, ...flatenErrors(val)]
				}
				return [...all, val]
			}, [])
			.filter(val => val !== null)
	}

	if (errors !== null) {
		return [errors]
	}

	return null
}

const formatErrors = errors => {
	const localErrors = flatenErrors(errors)

	if (localErrors.length === 1) {
		return localErrors[0]
	} else if (localErrors.length > 0) {
		return localErrors
	}

	return null
}

const verifySchema = schema => {
	if (!Array.isArray(schema) && !isObject(schema)) {
		if (typeof schema !== 'function') {
			return new Error(`Format schema error. Configuration is invalid. Expected functions, found "${schema}".`)
		}

		return null
	}

	if (Array.isArray(schema)) {
		if (schema.length === 0) {
			return new Error('Format schema error. Configuration is invalid. Expected non-empty array, found "[]".')
		}
		return schema.map(verifySchema)
	}

	if (isObject(schema)) {
		if (Object.keys(schema).length === 0) {
			return new Error('Format schema error. Configuration is invalid. Expected non-empty object, found "{}".')
		}

		return Object.keys(schema).map(key => verifySchema(schema[key]))
	}

	throw new Error(`Format schema error. Configuration is invalid. Found "${schema}".`)
}


module.exports = schema => {
	if (!isObject(schema) && !Array.isArray(schema)) {
		throw new Error(`Format schema error. Configuration is invalid. Expected object or array, found "${schema}".`)
	}

	const schemaError = formatErrors(verifySchema(schema))

	if (schemaError) {
		throw schemaError
	}

	return
}