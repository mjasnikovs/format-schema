const test = require('tape')
const schema = require('tape-schema')

const {
	stringFormat,
	intFormat,
	floatFormat,
	booleanFormat
} = require('../src/format')

const postgresFormat = require('../src/postgresFormat')

test('postgresFormat schema', t => {
	const schemaObject = {
		string: 'Hello, world',
		int: 22
	}

	const schemaPostgresObject = [
		{key: 'string', type: 'text', value: 'Hello, world'},
		{key: 'int', type: 'int', value: 22}
	]

	const objectFormat = {
		string: stringFormat(),
		int: intFormat()
	}

	const object = {
		string: 'Hello, world',
		int: 22
	}

	const {result, postgres} = postgresFormat(objectFormat, object)

	schema.test(t, schemaObject, result)
	schema.test(t, schemaPostgresObject, postgres)
	t.end()
})

test('postgresFormat schema undefined format error', t => {
	const objectFormat = {
		string: stringFormat(),
		int: intFormat(),
		aaa: 'aaa'
	}

	const object = {
		string: 'Hello, world',
		int: 22
	}

	const result = postgresFormat(objectFormat, object)
	schema.test(t, 'Schema has invalid value "aaa". Expected format Object', result.message)

	t.end()
})

test('postgresFormat schema fail', t => {
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

	const result = postgresFormat(objectFormat, object)
	schema.test(fakeTape, schemaObject, result)

	t.end()
})


test('postgresFormat schema fail with true (ignore) testing', t => {
	const objectFormat = {
		string: true,
		int: true
	}

	const object = {
		string: [],
		int: 'string'
	}

	const result = postgresFormat(objectFormat, object)
	schema.test(t, 'undefined type, "undefined" in schema', result.message)

	t.end()
})

test('postgresFormat schema passing undefined values', t => {
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

	const {result, postgres} = postgresFormat(objectFormat, object)

	schema.test(t, schemaObject, result)
	schema.test(t, [], postgres)

	t.end()
})

test('postgresFormat schema fail on require string', t => {
	const objectFormat = {
		string: stringFormat({require: true}),
		float: floatFormat(),
		int: intFormat(),
		boolean: booleanFormat()
	}

	const object = {}
	const result = postgresFormat(objectFormat, object)
	schema.test(t, 'Argument "string" cannot be undefined. Found: undefined', result.message)
	t.end()
})

test('postgresFormat schema fail on require float', t => {
	const objectFormat = {
		string: stringFormat(),
		float: floatFormat({require: true}),
		int: intFormat(),
		boolean: booleanFormat()
	}

	const object = {}
	const result = postgresFormat(objectFormat, object)
	schema.test(t, 'Argument "float" cannot be undefined. Found: undefined', result.message)
	t.end()
})

test('postgresFormat schema fail on require int', t => {
	const objectFormat = {
		string: stringFormat(),
		float: floatFormat(),
		int: intFormat({require: true}),
		boolean: booleanFormat()
	}

	const object = {}
	const result = postgresFormat(objectFormat, object)
	schema.test(t, 'Argument "int" cannot be undefined. Found: undefined', result.message)
	t.end()
})

test('postgresFormat schema fail on require float', t => {
	const objectFormat = {
		string: stringFormat(),
		float: floatFormat(),
		int: intFormat(),
		boolean: booleanFormat({require: true})
	}

	const object = {}
	const result = postgresFormat(objectFormat, object)
	schema.test(t, 'Argument "boolean" cannot be undefined. Found: undefined', result.message)
	t.end()
})
