const validateSchema = require('./validateSchema')
const validateInputs = require('./validateInputs')

const {
	OUTPUT_FORMAT_TYPE_PG,
	UNDEFINED_VALUE
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

				const type = localValue[0].type

				return {key, type: `${type}[]`, value}
			}

			return UNDEFINED_VALUE
		}

		if (typeof localValue === 'undefined') {
			return UNDEFINED_VALUE
		}

		const {type, value} = localValue
		return {key, type, value}
	})
		.filter(val => typeof val !== 'undefined')
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
