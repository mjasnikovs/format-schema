const test = require('tape')
const schema = require('tape-schema')

const {
	format,
	stringFormat,
	intFormat,
	floatFormat,
	booleanFormat
} = require('../src/format')

test('schema', t => {
	const schemaObject = {
		string: 'Hello, world',
		int: 22
	}

	const objectFormat = {
		string: stringFormat(),
		int: intFormat()
	}

	const object = {
		string: 'Hello, world',
		int: 22
	}

	const result = format(objectFormat, object)
	schema.test(t, schemaObject, result)
	t.end()
})

test('schema undefined format error', t => {
	const objectFormat = {
		string: stringFormat(),
		int: intFormat(),
		aaa: 'aaa'
	}

	const object = {
		string: 'Hello, world',
		int: 22
	}

	const result = format(objectFormat, object)
	schema.test(t, 'Schema has invalid value "aaa". Expected format Object', result.message)

	t.end()
})

test('schema fail', t => {
	const schemaObject = {
		string: 'Hello, world',
		int: 22
	}

	const objectFormat = {
		string: stringFormat(),
		int: intFormat()
	}

	const object = {
		string: [],
		int: 'string'
	}

	const fakeTape = {equal: (val, tar, msg) => t.notEqual(val, tar, msg)}

	const result = format(objectFormat, object)
	schema.test(fakeTape, schemaObject, result)

	t.end()
})


test('schema passing with true (ignore) testing', t => {
	const schemaObject = {
		string: [],
		int: 'string'
	}

	const objectFormat = {
		string: true,
		int: true
	}

	const object = {
		string: [],
		int: 'string'
	}

	const result = format(objectFormat, object)
	schema.test(t, schemaObject, result)

	t.end()
})

test('schema passing undefined values', t => {
	const schemaObject = {
		string: schema.undef,
		int: schema.undef,
		float: schema.undef,
		boolean: schema.undef
	}

	const objectFormat = {
		string: stringFormat(),
		float: floatFormat(),
		int: intFormat(),
		boolean: booleanFormat()
	}

	const object = {}

	const result = format(objectFormat, object)

	schema.test(t, schemaObject, result)

	t.end()
})

test('schema fail on require string', t => {
	const objectFormat = {
		string: stringFormat({require: true}),
		float: floatFormat(),
		int: intFormat(),
		boolean: booleanFormat()
	}

	const object = {}
	const result = format(objectFormat, object)
	schema.test(t, 'Argument "string" cannot be undefined. Found: undefined', result.message)
	t.end()
})

test('schema fail on require float', t => {
	const objectFormat = {
		string: stringFormat(),
		float: floatFormat({require: true}),
		int: intFormat(),
		boolean: booleanFormat()
	}

	const object = {}
	const result = format(objectFormat, object)
	schema.test(t, 'Argument "float" cannot be undefined. Found: undefined', result.message)
	t.end()
})

test('schema fail on require int', t => {
	const objectFormat = {
		string: stringFormat(),
		float: floatFormat(),
		int: intFormat({require: true}),
		boolean: booleanFormat()
	}

	const object = {}
	const result = format(objectFormat, object)
	schema.test(t, 'Argument "int" cannot be undefined. Found: undefined', result.message)
	t.end()
})

test('schema fail on require float', t => {
	const objectFormat = {
		string: stringFormat(),
		float: floatFormat(),
		int: intFormat(),
		boolean: booleanFormat({require: true})
	}

	const object = {}
	const result = format(objectFormat, object)
	schema.test(t, 'Argument "boolean" cannot be undefined. Found: undefined', result.message)
	t.end()
})
