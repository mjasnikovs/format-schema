import validateSchema from './validateSchema'
import validateInputs from './validateInputs'
import {isConstructor} from './validators'

export const postgresPromiseFormat = (schema: any, errorClass?: any) => {
	validateSchema(schema)

	if (typeof errorClass !== 'undefined' && isConstructor(errorClass) !== true) {
		throw new Error(`Format class constructor error. Error constructor is invalid. Expected class constructor, found "${errorClass}".`)
	}

	return (values: any) =>
		new Promise((resolve, reject) => {
			const result = validateInputs(schema, values, {outputType: 'POSTGRES', key: 'NAMESPACE_DEFAULT_NAME'})

			if (result instanceof Error) {
				if (typeof errorClass !== 'undefined') {
					return reject(new errorClass(result))	
				}
				return reject(result)
			}
			return resolve(result)
		})
}
