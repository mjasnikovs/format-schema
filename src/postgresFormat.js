const {
	format,
	STRING,
	INTEGER,
	FLOAT,
	BOOLEAN
} = require('./format')

module.exports = (schema, values) => {
	const inputs = format(schema, values)

	if (inputs instanceof Error) {
		return inputs
	}

	const postgres = Object.keys(inputs).map(key => {
		const {$type} = schema[key]
		const value = inputs[key]

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
		return {inputs, postgres}
	}

	return error
}
