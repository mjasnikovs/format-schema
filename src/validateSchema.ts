import {
	isObject
} from './validators'

const flatenErrors = (schemaTest: any): Error[] | [] => {
	if (Array.isArray(schemaTest)) {
		return schemaTest.reduce((acc: any, val: any) =>
			Array.isArray(val) ? acc.concat(flatenErrors(val)) : acc.concat(val), [])
			.filter((val: any) => val !== null)
	}

	if (schemaTest !== null) {
		return [schemaTest]
	}

	return []
}

const validateSchema = (schema: any): any => {
	if (Array.isArray(schema)) {
		if (schema.length === 0) {
			return new Error('Format schema error. Configuration is invalid. Expected non-empty array, found "[]".')
		}
		return schema.map(validateSchema)
	}

	if (isObject(schema) === true) {
		if (Object.values(schema).length === 0) {
			return new Error('Format schema error. Configuration is invalid. Expected non-empty object, found "{}".')
		}
		return Object.values(schema).map(validateSchema)
	}

	if (typeof schema !== 'function') {
		return new Error(`Format schema error. Configuration is invalid. Expected function, found "${schema}".`)
	}

	return null
}

export default (schema: any): null => {
	const test = flatenErrors(validateSchema(schema))

	if (test.length > 0) {
		throw test[0]
	}

	return null
}
