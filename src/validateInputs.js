const {
	isObject
} = require('./validators')

const {
	NAMESPACE_DEFAULT_NAME,
	UNDEFINED_VALUE,
	OUTPUT_FORMAT_TYPE_OBJECT
} = require('./types')

const validateInputs = (schema, values, namespace = '', outputType = OUTPUT_FORMAT_TYPE_OBJECT) => {
	if (Array.isArray(schema)) {
		if (schema.length === 1) {
			if (Array.isArray(values)) {
				if (!values.length) {
					const localNamespace = namespace ? `${namespace}[0]` : '[0]'

					const result = validateInputs(schema[0], UNDEFINED_VALUE, localNamespace, outputType)

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

					const result = validateInputs(schema[0], values[i], localNamespace, outputType)

					if (result instanceof Error) {
						result.message = result.message.replace(NAMESPACE_DEFAULT_NAME, localNamespace)
						return result
					}

					out = [...out, result]
				}

				return out
			} else {
				const localNamespace = namespace ? `${namespace}[0]` : '[0]'
				const result = validateInputs(schema[0], UNDEFINED_VALUE, localNamespace, outputType)

				if (result instanceof Error) {
					return new Error(`Format error. "${namespace}" has invalid value "${values}". Expected array, found "${values}".`)
				}
				return
			}
		} else if (Array.isArray(values)) {
			let out = []
			const schemaLength = schema.length

			for (let i = 0; i < schemaLength; i += 1) {
				const localNamespace = namespace ? `${namespace}[${i}]` : `[${i}]`

				const result = validateInputs(schema[i], values[i], localNamespace, outputType)

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

			out[key] = validateInputs(schema[key], values ? values[key] : UNDEFINED_VALUE, localNamespace, outputType)

			if (out[key] instanceof Error) {
				out[key].message = out[key].message.replace(NAMESPACE_DEFAULT_NAME, localNamespace)
				return out[key]
			}
		}

		return out
	}

	return schema(values, outputType)
}

module.exports = validateInputs
