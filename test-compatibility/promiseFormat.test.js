const test = require('tape')
const schema = require('tape-schema')

const {
	promiseFormat,
	stringFormat,
	integerFormat,
	floatFormat,
	booleanFormat
} = require('../src')

const formatTest = promiseFormat({
	string: stringFormat(),
	integer: integerFormat({naturalNumber: true}),
	float: floatFormat(),
	boolean: booleanFormat(),
	list: [stringFormat()]
})

const inputValid = {
	string: 'string',
	integer: 10,
	float: 10.1,
	boolean: true,
	list: ['list']
}

test('promiseFormat success', async t => {
	try {
		const result = await formatTest(inputValid)
		schema.test(t, inputValid, result)
		t.end()
	} catch(e) {
		t.end(e.message)
	}
})

const inputInvalid = {
	string: 'string',
	integer: -10,
	float: 10.1,
	boolean: true,
	list: ['list']
}

test('promiseFormat fail', async t => {
	try {
		await formatTest(inputInvalid)
		t.end('no-error')
	} catch(e) {
		t.equal(e.message, 'Format error. "integer" has invalid value "-10". Expected natural number, found "-10".')
		t.end()
	}
})

test('postgresPromiseFormat error class constructor', async t => {
	class CustomError extends Error {
		someCustomFunction() {}
	}

	const test = promiseFormat(stringFormat({notEmpty: true}), CustomError)

	try {
		const result = await test(null)
		t.end('no-error')
	} catch(e) {
		t.equal(typeof e.someCustomFunction, 'function')
		t.end()
	}
})
