import validateSchema from './validateSchema'
import validateInputs from './validateInputs'

export const postgresFormat = (schema: any) => {
	validateSchema(schema)
	return (values: any) =>
		validateInputs(schema, values, {outputType: 'POSTGRES', key: 'NAMESPACE_DEFAULT_NAME'})
}
