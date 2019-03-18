import {
	isObject
} from './validators'

import {
	IFormatInputOptions,
	defaultFormatOptions
} from './types'

const validateInputs = (
	schema: any,
	input: any,
	options: IFormatInputOptions = defaultFormatOptions
): any | Error => {
	if (Array.isArray(schema)) {
		if (schema.length === 1) {
			if (Array.isArray(input)) {
				if (input.length === 0) {
					const result = validateInputs(
						schema[0],
						undefined,
						{
							...options,
							namespace: options.namespace ? `${options.namespace}[0]` : `[0]`,
							key: 0
						}
					)

					if (result instanceof Error) {
						return result
					}

					return []					
				}
				
				return input.reduce((all: any, _: any, index, output) => {
					const result = validateInputs(
						schema[0],
						input[index] || undefined,
						{
							...options,
							namespace: options.namespace ? `${options.namespace}[${index}]` : `[${index}]`,
							key: index
						}
					)

					if (result instanceof Error) {
						output.splice(index) // break;
						return result
					}

					all[index] = result
					return all
				}, [])
			}

			const result = validateInputs(
				schema[0],
				undefined,
				options
			)

			if (result instanceof Error) {
				return new Error(`Format error. "${options.namespace}" has invalid value "${input}". Expected array, found "${input}".`)
			}

			return []	

		} else if (schema.length > 1) {
			return schema.reduce((all: any, _: any, index, output) => {
				const result = validateInputs(
					schema[index],
					input[index],
					{
						...options,
						namespace: options.namespace ? `${options.namespace}[${index}]` : `[${index}]`,
						key: index
					}
				)

				if (result instanceof Error) {
					output.splice(index) // break;
					return result
				}

				all[index] = result
				return all
			}, [])
		}

		return []
	}

	if (isObject(schema)) {
		return Object.keys(schema)
			.reduce((all: any, key: any, index, output) => {
				const result = validateInputs(
					schema[key],
					input ? input[key] : undefined,
					{...options, namespace: key, key}
				)

				if (result instanceof Error) {
					output.splice(index) // break;
					return result
				}

				all[key] = result
				return all
			}, {})
	}

	return schema(input, options)
}

export default validateInputs
