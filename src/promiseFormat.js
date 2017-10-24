const validateSchema = require('./validateSchema')
const validateInputs = require('./validateInputs')

module.exports = schema => {
	validateSchema(schema)

	return values =>
		new Promise((resolve, reject) => {
			const result = validateInputs(schema, values)

			if (result instanceof Error) {
				return reject(result)
			}

			return resolve(result)
		})
}
