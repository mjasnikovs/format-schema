const test = require('tape')
const schema = require('tape-schema')
const parseBoolean = require('../src/boolean')

test('boolean', t => {
	const boolean = true
	schema.test(t,
		boolean,
		parseBoolean(boolean)
	)
	t.end()
})

test('boolean false', t => {
	const boolean = false
	schema.test(t,
		boolean,
		parseBoolean(boolean)
	)
	t.end()
})

test('boolean string error', t => {
	const boolean = '2147483648'
	schema.test(t,
		{
			message: 'Argument "Boolean" has invalid value "2147483648". Expected boolean, found: 2147483648',
			locations: schema.undef,
			path: schema.undef
		},
		parseBoolean(boolean)
	)
	t.end()
})

test('boolean array error', t => {
	const boolean = []
	schema.test(t,
		{
			message: 'Argument "Boolean" cannot represent boolean value. Expected boolean, found: []',
			locations: schema.undef,
			path: schema.undef
		},
		parseBoolean(boolean)
	)
	t.end()
})


test('boolean object error', t => {
	const boolean = {data: null}
	schema.test(t,
		{
			message: 'Argument "Boolean" has invalid value "[object Object]". Expected boolean, found: [object Object]',
			locations: schema.undef,
			path: schema.undef
		},
		parseBoolean(boolean)
	)
	t.end()
})

test('boolean int error', t => {
	const boolean = 10
	schema.test(t,
		{
			message: 'Argument "Boolean" has invalid value "10". Expected boolean, found: 10',
			locations: schema.undef,
			path: schema.undef
		},
		parseBoolean(boolean)
	)
	t.end()
})

test('boolean float error', t => {
	const boolean = 10.1
	schema.test(t,
		{
			message: 'Argument "Boolean" has invalid value "10.1". Expected boolean, found: 10.1',
			locations: schema.undef,
			path: schema.undef
		},
		parseBoolean(boolean)
	)
	t.end()
})
