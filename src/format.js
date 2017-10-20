const {
	isObject,
	validateSchema
} = require('./validators')

const {
	formatErrors
} = require('./errorHandling')

const format = (schema, values) => {
	return schema
}

module.exports = schema => {
	if (!isObject(schema) && !Array.isArray(schema)) {
		throw new Error(`Format schema error. Configuration is invalid. Expected object or array, found "${schema}".`)
	}

	const schemaError = validateSchema(schema)

	if (schemaError) {
		throw formatErrors(schemaError)
	}

	return value => format(schema, value)
}
