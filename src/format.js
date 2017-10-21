const {
	isObject
} = require('./validators')

const {
	formatErrors,
	validateSchema
} = require('./errorHandling')

const {
	NAMESPACE_DEFAULT_NAME,
	UNDEFINED_VALUE
} = require('./types')

const format = (schema, values, namespace = '') => {
	if (Array.isArray(schema)) {
		if (schema.length === 1) {
			if (Array.isArray(values)) {
				if (!values.length) {
					const localNamespace = namespace ? `${namespace}[0]` : '[0]'

					const result = format(schema[0], UNDEFINED_VALUE, localNamespace)

					if (result instanceof Error) {
						result.message = result.message.replace(NAMESPACE_DEFAULT_NAME, localNamespace)
						return result
					}

					return []
				}

				let out = []
				const valuesLength = values.length

				for (let i = 0; i < valuesLength; i += 1) {
					const localNamespace = namespace ? `${namespace}[${i}]` : `[${i}]`

					const result = format(schema[0], values[i], localNamespace)

					if (result instanceof Error) {
						result.message = result.message.replace(NAMESPACE_DEFAULT_NAME, localNamespace)
						return result
					}

					out = [...out, result]
				}

				return out
			} else {
				return new Error(`Format error. "${namespace}" has invalid value "${values}". Expected array, found "${values}".`)
			}
		} else if (Array.isArray(values)) {
			let out = []
			const schemaLength = schema.length

			for (let i = 0; i < schemaLength; i += 1) {
				const localNamespace = namespace ? `${namespace}[${i}]` : `[${i}]`

				const result = format(schema[i], values[i], localNamespace)

				if (result instanceof Error) {
					result.message = result.message.replace(NAMESPACE_DEFAULT_NAME, localNamespace)
					return result
				}

				out = [...out, result]
			}

			return out
		}

		return new Error(`Format error. "${namespace}" has invalid value "${values}". Expected array, found "${values}".`)
	}

	if (isObject(schema)) {
		const schemaKeys = Object.keys(schema)

		const out = {}
		const schemaLength = schemaKeys.length

		for (let i = 0; i < schemaLength; i += 1) {
			const key = schemaKeys[i]
			const localNamespace = namespace ? `${namespace}.${key}` : key

			out[key] = format(schema[key], values ? values[key] : UNDEFINED_VALUE, localNamespace)

			if (out[key] instanceof Error) {
				out[key].message = out[key].message.replace(NAMESPACE_DEFAULT_NAME, localNamespace)
				return out[key]
			}
		}

		return out
	}

	return schema(values)
}

module.exports = schema => {
	if (!isObject(schema) && !Array.isArray(schema)) {
		throw new Error(`Format schema error. Configuration is invalid. Expected object or array, found "${schema}".`)
	}

	const schemaError = formatErrors(validateSchema(schema))

	if (schemaError) {
		throw schemaError
	}

	return value => format(schema, value)
}
