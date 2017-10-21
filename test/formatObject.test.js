const test = require('tape')
const schema = require('tape-schema')

const {
	format,
	stringFormat,
	integerFormat,
	floatFormat,
	booleanFormat
} = require('../src')

test('format object success', t => {
	const formatTest = format({
		string: stringFormat(),
		integer: integerFormat(),
		float: floatFormat(),
		boolean: booleanFormat()
	})

	const inputs = {
		string: 'string',
		integer: 10,
		float: 0.1,
		boolean: true
	}

	schema.test(t, inputs, formatTest(inputs))
	t.end()
})

test('format object fail', t => {
	const formatTest = format({
		string: stringFormat(),
		integer: integerFormat(),
		float: floatFormat(),
		boolean: booleanFormat()
	})

	const inputs = {
		string: 10,
		integer: '10',
		float: '0.1',
		boolean: 'true'
	}

	const result = formatTest(inputs)

	schema.test(t, result.message, 'Format error. "string" has invalid value "10". Expected string, found "10".')

	t.end()
})

test('format object fail string', t => {
	const formatTest = format({
		string: stringFormat({max: 3})
	})

	const inputs = {
		string: 'string'
	}

	const result = formatTest(inputs)

	schema.test(t, result.message, 'Format error. "string" has invalid value "string". Expected maximal length of "3" characters, found "6" characters.')

	t.end()
})

test('format object fail integer', t => {
	const formatTest = format({
		integer: integerFormat({naturalNumber: true})
	})

	const inputs = {
		integer: -10
	}

	const result = formatTest(inputs)

	schema.test(t, result.message, 'Format error. "integer" has invalid value "-10". Expected natural number, found "-10".')

	t.end()
})

test('format object fail float', t => {
	const formatTest = format({
		float: floatFormat({positive: true})
	})

	const inputs = {
		float: -10.0
	}

	const result = formatTest(inputs)

	schema.test(t, result.message, 'Format error. "float" has invalid value "-10". Expected positve float, found "-10".')

	t.end()
})

test('format object fail boolean', t => {
	const formatTest = format({
		boolean: booleanFormat()
	})

	const inputs = {
		boolean: -10.0
	}

	const result = formatTest(inputs)

	schema.test(t, result.message, 'Format error. "boolean" has invalid value "-10". Expected boolean, found "-10".')

	t.end()
})


test('format missing object fail', t => {
	const formatTest = format({
		stringArray: [stringFormat()]
	})

	const inputs = {
		stringArray: 'string'
	}

	const result = formatTest(inputs)

	schema.test(t, result.message, 'Format error. "stringArray" has invalid value "string". Expected array, found "string".')

	t.end()
})
