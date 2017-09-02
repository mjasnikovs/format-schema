const STRING = '$STRING'
const INTEGER = '$INTEGER'
const FLOAT = '$FLOAT'
const BOOLEAN = '$BOOLEAN'

const formatInteger = require('./int')
const formatString = require('./string')
const formatFloat = require('./float')
const formatBoolean = require('./boolean')

const isObject = object => {
	return typeof object === 'object' && object !== null && !Array.isArray(object) && object === Object(object)
}

const format = (schema, values) => {
	if (!isObject(schema)) {
		return new Error('Schema has invalid value. Expected Object')
	}

	if (!isObject(values)) {
		return new Error('Value has invalid value. Expected Object')
	}

	let result = {}

	Reflect
		.ownKeys(schema)
		.find(key => {
			const localSchema = Reflect.get(schema, key)

			if (localSchema !== true && typeof localSchema.$options === 'undefined') {
				result = new Error(`Schema has invalid value "${localSchema}". Expected format Object`)
				return true
			} else if (Reflect.has(values, key)) {
				const formatValue = ((value, options) => {
					if (localSchema.$type === STRING) {
						return formatString(value, options)
					} else if (localSchema.$type === INTEGER) {
						return formatInteger(value, options)
					} else if (localSchema.$type === FLOAT) {
						return formatFloat(value, options)
					} else if (localSchema.$type === BOOLEAN) {
						return formatBoolean(value, options)
					} else if (localSchema === true) {
						return value
					}
					result = new Error(`Schema has invalid value "${value}". Expected format Object`)
					return true
				})(
					Reflect.get(values, key),
					Object.assign({}, localSchema.$options, {name: key})
				)

				if (formatValue instanceof Error) {
					result = formatValue
					return true
				}

				Reflect.set(result, key, formatValue)
			} else if (localSchema.$options.require === true) {
				result = new Error(`Argument "${key}" cannot be undefined. Found: undefined`)
				return true
			}

			return false
		})

	return result
}

const stringFormat = ($options = {}) => {
	if (!isObject($options)) {
		return new Error(`Schema has invalid option value "${String($options)}". Expected Object`)
	}

	return {
		$type: STRING,
		$options
	}
}

const intFormat = ($options = {}) => {
	if (!isObject($options)) {
		return new Error(`Schema has invalid option value "${String($options)}". Expected Object`)
	}

	return {
		$type: INTEGER,
		$options
	}
}

const floatFormat = ($options = {}) => {
	if (!isObject($options)) {
		return new Error(`Schema has invalid option value "${String($options)}". Expected Object`)
	}

	return {
		$type: FLOAT,
		$options
	}
}

const booleanFormat = ($options = {}) => {
	if (!isObject($options)) {
		return new Error(`Schema has invalid option value "${String($options)}". Expected Object`)
	}

	return {
		$type: BOOLEAN,
		$options
	}
}

module.exports = {
	format,
	stringFormat,
	intFormat,
	floatFormat,
	booleanFormat
}
