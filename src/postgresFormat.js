const {
	format,
	STRING,
	INTEGER,
	FLOAT,
	BOOLEAN
} = require('./format')

module.exports = (schema, values) => {
	const result = format(schema, values)

	if (result instanceof Error) {
		return result
	}

	const postgres = Object.keys(result).map(key => {
		const {$type} = schema[key]
		const value = result[key]

		if ($type === STRING) {
			return {key, type: 'text', value}
		} else if ($type === INTEGER) {
			return {key, type: 'int', value}
		} else if ($type === FLOAT) {
			return {key, type: 'numeric', value}
		} else if ($type === BOOLEAN) {
			return {key, type: 'boolean', value}
		}
		return new Error(`undefined type, "${value.$type}" in schema`)
	})

	const error = postgres.find(val => val instanceof Error)

	if (typeof error === 'undefined') {
		return {result, postgres}
	}

	return error
}
