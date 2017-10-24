const validateSchema = require('./validateSchema')
const validateInputs = require('./validateInputs')

module.exports = schema => {
	validateSchema(schema)
	return values => validateInputs(schema, values)
}
