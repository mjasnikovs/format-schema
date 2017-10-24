const test = require('tape')
const schema = require('tape-schema')

const {
	postgresFormat,
	stringFormat,
	integerFormat,
	floatFormat,
	booleanFormat
} = require('../src')

const formatTest = postgresFormat({
	string: stringFormat(),
	integer: integerFormat({naturalNumber: true}),
	float: floatFormat(),
	boolean: booleanFormat(),
	list: [stringFormat()]
})

const inputObject = {
	string: 'string',
	integer: 10,
	float: 10.1,
	boolean: true,
	list: ['list']
}

const outputObject = {
	string: 'string',
	integer: 10,
	float: 10.1,
	boolean: true,
	list: ['list']
}

test('postgresFormat success', t => {
	const result = formatTest(inputObject)
	console.log({result})
	console.log({list: result.list})
	t.end()
})
