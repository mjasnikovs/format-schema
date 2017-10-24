const validateSchema = require('./validateSchema')
const validateInputs = require('./validateInputs')

const {
	OUTPUT_FORMAT_TYPE_PG
} = require('./types')

const formatForPG = values => {
	if (Array.isArray(values)) {
		return values.map(formatForPG)
	}

	return Object.keys(values).map(key => {
		const localValue = values[key]

		if (Array.isArray(localValue)) {
			if (localValue.length) {
				const value = localValue
					.map(val => val.value)
					.filter(val => typeof val !== 'undefined')
			}

			return
		}

		const {type, value} = localValue
		return {key, type, value}
	})
}

module.exports = schema => {
	validateSchema(schema)

	return values => {
		const result = validateInputs(schema, values, '', OUTPUT_FORMAT_TYPE_PG)

		if (result instanceof Error) {
			return result
		}

		return formatForPG(result)
	}
}
