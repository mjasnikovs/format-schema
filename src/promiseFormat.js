const format = require('./format')

module.exports = schema => {
	const formatTest = format(schema)

	return values =>
		new Promise((resolve, reject) => {
			const result = formatTest(values)

			if (result instanceof Error) {
				return reject(result)
			}

			return resolve(result)
		})
}
