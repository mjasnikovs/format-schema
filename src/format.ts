import validateSchema from './validateSchema'
import validateInputs from './validateInputs'

export const format = (schema: any) => {
	validateSchema(schema)
	return (values: any) => validateInputs(schema, values)
}
