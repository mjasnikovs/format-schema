const test = require('tape')
const schema = require('tape-schema')

const {
	format,
	stringFormat,
	integerFormat,
	floatFormat,
	booleanFormat
} = require('../src')

test('format array success', t => {
	const formatTest = format([
		{
			string: stringFormat(),
			integer: integerFormat(),
			float: floatFormat(),
			boolean: booleanFormat()
		}
	])

	const inputs = [{
		string: 'string',
		integer: 10,
		float: 0.1,
		boolean: true
	}]

	schema.test(t, inputs, formatTest(inputs))
	t.end()
})

test('format strict array success', t => {
	const formatTest = format([
		{
			string1: stringFormat(),
			integer1: integerFormat(),
			float1: floatFormat(),
			boolean1: booleanFormat()
		},
		{
			string2: stringFormat(),
			integer2: integerFormat(),
			float2: floatFormat(),
			boolean2: booleanFormat()
		}
	])

	const inputs = [
		{
			string1: 'string1',
			integer1: 10,
			float1: 0.1,
			boolean1: true
		},
		{
			string2: 'string2',
			integer2: 10,
			float2: 0.1,
			boolean2: true
		}
	]

	schema.test(t, inputs, formatTest(inputs))
	t.end()
})

test('format deep array success', t => {
	const formatTest = format({
		stringArray: [stringFormat()]
	})

	const inputs = {
		stringArray: ['string']
	}

	schema.test(t, inputs, formatTest(inputs))
	t.end()
})

test('format missing array fail', t => {
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

test('format deeple nested array success', t => {
	const formatTest = format({
		stringArray: [[[stringFormat()]]]
	})

	const inputs = {
		stringArray: [[['string']]]
	}

	schema.test(t, inputs, formatTest(inputs))
	t.end()
})

test('format deeple nested array fail', t => {
	const formatTest = format({
		stringArray: [[[stringFormat()]]]
	})

	const inputs = {
		stringArray: [[[10]]]
	}

	const result = formatTest(inputs)

	schema.test(t, result.message, 'Format error. "stringArray[0][0][0]" has invalid value "10". Expected string, found "10".')

	t.end()
})

test('format missing array fail', t => {
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

test('format undefined array success', t => {
	const formatTest = format({
		stringArray: [stringFormat()]
	})

	const inputs = {
		stringArray: []
	}

	schema.test(t, inputs, formatTest(inputs))
	t.end()
})

test('format undefined array fail', t => {
	const formatTest = format({
		stringArray: [stringFormat({notUndef: true})]
	})

	const inputs = {
		stringArray: []
	}

	const result = formatTest(inputs)

	schema.test(t, result.message, 'Format error. "stringArray[0]" has invalid value "undefined". Expected string, found undefined value.')

	t.end()
})

test('format undefined strict array fail', t => {
	const formatTest = format({
		stringArray: [stringFormat({notUndef: true}), stringFormat({notUndef: true})]
	})

	const inputs = {
		stringArray: []
	}

	const result = formatTest(inputs)

	schema.test(t, result.message, 'Format error. "stringArray[0]" has invalid value "undefined". Expected string, found undefined value.')

	t.end()
})
