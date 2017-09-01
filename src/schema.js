const parseInt = require('./int')
const parseString = require('./string')

const $TAPE_SCHEMA = '$TAPE_SCHEMA'

const STRING = '$STRING'
const STRING_O = '$STRING_O'
const INTEGER = '$INTEGER'
const INTEGER_O = '$INTEGER_O'

const isDirectValue = val => ['boolean', 'number', 'string'].indexOf(typeof val) !== -1 || val === null

const validator = (schema, object, prefix = '') => {
	if (isDirectValue(schema)) {
		if (schema === object) {
			return schema
		}
		return new Error(`Argument "${prefix}" has invalid value "${object}". Expected: ${schema}`)
	}

	if (typeof schema === 'undefined') {
		return new Error('schema can\'t be typeof undefined, use schema.undef to validate undefined values')
	}

	if (schema.$TAPE_SCHEMA === $TAPE_SCHEMA) {
		if (schema.$type === STRING) {
			return parseString(object)
		} else if (schema.$type === STRING_O) {
			return parseString(object, schema.$options)
		} else if (schema.$type === INTEGER) {
			return parseInt(object)
		} else if (schema.$type === INTEGER_O) {
			return parseInt(object, schema.$options)
		}
	}

	Object.keys(schema).map(key => {
		if (object) {
			return validator(schema[key], object[key], `${prefix}${prefix ? '.' : ''}${key}`)
		}

		return new Error(`Argument "${prefix}" haw invalid value "${object}". Expected: typeof "object"`)
	})
}

const test = (schema, object) => {
	return validator(schema, object)
}

const string = {
	$TAPE_SCHEMA,
	$type: STRING
}

const stringO = $options => {
	return {
		$TAPE_SCHEMA,
		$type: STRING_O,
		$options
	}
}

const integer = {
	$TAPE_SCHEMA,
	$type: INTEGER
}

const integerO = $options => {
	return {
		$TAPE_SCHEMA,
		$type: INTEGER_O,
		$options
	}
}

module.exports = {
	test,
	string,
	stringO,
	integer,
	integerO
}
