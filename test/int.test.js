const test = require('tape')
const schema = require('tape-schema')
const parseInt = require('../src/int')

test('int', t => {
	const integer = 1
	schema.test(t,
		integer,
		parseInt(integer)
	)
	t.end()
})

test('int string error', t => {
	const integer = '2147483648'
	schema.test(t,
		{
			message: 'Int "Integer" cannot represent non 32-bit signed integer value: 2147483648',
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer)
	)
	t.end()
})

test('int NaN error', t => {
	const integer = NaN
	schema.test(t,
		{
			message: 'Int "Integer" cannot represent non-integer value: "NaN"',
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer)
	)
	t.end()
})

test('int Array error', t => {
	const integer = []
	schema.test(t,
		{
			message: 'Int "Integer" cannot represent non 32-bit signed integer value: []',
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer)
	)
	t.end()
})

test('int float error', t => {
	const integer = 0.0001
	schema.test(t,
		{
			message: 'Int "Integer" cannot represent non-integer value: "0.0001"',
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer)
	)
	t.end()
})


test('int Object error', t => {
	const integer = {}
	schema.test(t,
		{
			message: 'Int "Integer" cannot represent non-integer value: "[object Object]"',
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer)
	)
	t.end()
})

test('int Date error', t => {
	const integer = new Date()
	schema.test(t,
		{
			message: schema.string,
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer)
	)
	t.end()
})

test('int max', t => {
	const integer = 2147483648
	schema.test(t,
		{
			message: 'Int "Integer" cannot represent non 32-bit signed integer value: 2147483648',
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer)
	)
	t.end()
})

test('int error max', t => {
	const integer = 2147483647
	schema.test(t,
		integer,
		parseInt(integer)
	)
	t.end()
})

test('int min', t => {
	const integer = -2147483649
	schema.test(t,
		{
			message: 'Int "Integer" cannot represent non 32-bit signed integer value: -2147483649',
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer)
	)
	t.end()
})

test('int error min', t => {
	const integer = -2147483649
	schema.test(t,
		{
			message: 'Int "Integer" cannot represent non 32-bit signed integer value: -2147483649',
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer)
	)
	t.end()
})

test('naturalNumber', t => {
	const integer = 10
	schema.test(t,
		integer,
		parseInt(integer, {naturalNumber: true})
	)
	t.end()
})

test('naturalNumber error', t => {
	const integer = -10
	schema.test(t,
		{
			message: 'Argument "Integer" has invalid value "-10". Expected natural number, found: -10',
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer, {naturalNumber: true})
	)
	t.end()
})

test('notZero', t => {
	const integer = 10
	schema.test(t,
		integer,
		parseInt(integer, {notZero: true})
	)
	t.end()
})

test('notZero error', t => {
	const integer = 0
	schema.test(t,
		{
			message: 'Argument "Integer" has invalid value "0". Expected non-zero, found: 0',
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer, {notZero: true})
	)
	t.end()
})

test('max', t => {
	const integer = 10
	schema.test(t,
		integer,
		parseInt(integer, {max: 10})
	)
	t.end()
})

test('max error', t => {
	const integer = 11
	schema.test(t,
		{
			message: 'Argument "Integer" has invalid value "11". Expected maximum value of 10, found: 11',
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer, {max: 10})
	)
	t.end()
})

test('min', t => {
	const integer = 10
	schema.test(t,
		integer,
		parseInt(integer, {min: 10})
	)
	t.end()
})

test('min error', t => {
	const integer = 9
	schema.test(t,
		{
			message: 'Argument "Integer" has invalid value "9". Expected minimum value of 10, found: 9',
			locations: schema.undef,
			path: schema.undef
		},
		parseInt(integer, {min: 10})
	)
	t.end()
})
