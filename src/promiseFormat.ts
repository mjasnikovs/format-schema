import validateSchema from './validateSchema'
import validateInputs from './validateInputs'

export const promiseFormat = (schema: any) => {
	validateSchema(schema)

	return (values: any) =>
		new Promise((resolve, reject) => {
			const result = validateInputs(schema, values)

			if (result instanceof Error) {
				return reject(result)
			}
			return resolve(result)
		})
}
