const test = require('tape')
const schema = require('tape-schema')
const parseFloat = require('../src/float')

test('float', t => {
	const float = 1.1
	schema.test(t,
		float,
		parseFloat(float)
	)
	t.end()
})

test('float string error', t => {
	const float = '2147483648'
	schema.test(t,
		{
			message: 'Float "Float" cannot represent non 32-bit signed value: 2147483648',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float)
	)
	t.end()
})

test('float NaN error', t => {
	const float = NaN
	schema.test(t,
		{
			message: 'Float "Float" cannot represent non-float value: "NaN"',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float)
	)
	t.end()
})

test('float Array error', t => {
	const float = []
	schema.test(t,
		{
			message: 'Float "Float" cannot represent non 32-bit signed value: []',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float)
	)
	t.end()
})

test('float boolean error', t => {
	const float = false
	schema.test(t,
		{
			message: 'Float "Float" cannot represent non 32-bit signed value: false',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float)
	)
	t.end()
})

test('float Object error', t => {
	const float = {}
	schema.test(t,
		{
			message: 'Float "Float" cannot represent non-float value: "[object Object]"',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float)
	)
	t.end()
})

test('float Date error', t => {
	const float = new Date()
	schema.test(t,
		{
			message: schema.string,
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float)
	)
	t.end()
})

test('float max value error', t => {
	const float = 2147483648
	schema.test(t,
		{
			message: 'Float "Float" cannot represent non 32-bit signed value: 2147483648',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float)
	)
	t.end()
})

test('float max value', t => {
	const float = 2147483647
	schema.test(t,
		float,
		parseFloat(float)
	)
	t.end()
})

test('float min value error', t => {
	const float = -2147483649
	schema.test(t,
		{
			message: 'Float "Float" cannot represent non 32-bit signed value: -2147483649',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float)
	)
	t.end()
})

test('float min value', t => {
	const float = -2147483648
	schema.test(t,
		float,
		parseFloat(float)
	)
	t.end()
})

test('float notZero', t => {
	const float = 10
	schema.test(t,
		float,
		parseFloat(float, {notZero: true})
	)
	t.end()
})

test('float notZero error', t => {
	const float = 0
	schema.test(t,
		{
			message: 'Argument "Float" has invalid value "0". Expected non-zero, found: 0',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float, {notZero: true})
	)
	t.end()
})

test('float max', t => {
	const float = 10
	schema.test(t,
		float,
		parseFloat(float, {max: 10})
	)
	t.end()
})

test('float max error', t => {
	const float = 11
	schema.test(t,
		{
			message: 'Argument "Float" has invalid value "11". Expected maximum value of 10, found: 11',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float, {max: 10})
	)
	t.end()
})

test('float min', t => {
	const float = 10
	schema.test(t,
		float,
		parseFloat(float, {min: 10})
	)
	t.end()
})

test('float min error', t => {
	const float = 9
	schema.test(t,
		{
			message: 'Argument "Float" has invalid value "9". Expected minimum value of 10, found: 9',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float, {min: 10})
	)
	t.end()
})

test('float latitude', t => {
	const float = 10
	schema.test(t,
		float,
		parseFloat(float, {latitude: true})
	)
	t.end()
})

test('float latitude error -91', t => {
	const float = -91
	schema.test(t,
		{
			message: 'Argument "Float" has invalid value "-91". Expected latitude, found: -91',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float, {latitude: true})
	)
	t.end()
})

test('float latitude error 91', t => {
	const float = 91
	schema.test(t,
		{
			message: 'Argument "Float" has invalid value "91". Expected latitude, found: 91',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float, {latitude: true})
	)
	t.end()
})

test('float longitude', t => {
	const float = 10
	schema.test(t,
		float,
		parseFloat(float, {longitude: true})
	)
	t.end()
})

test('float longitude error -181', t => {
	const float = -181
	schema.test(t,
		{
			message: 'Argument "Float" has invalid value "-181". Expected longitude, found: -181',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float, {longitude: true})
	)
	t.end()
})

test('float longitude error 181', t => {
	const float = 181
	schema.test(t,
		{
			message: 'Argument "Float" has invalid value "181". Expected longitude, found: 181',
			locations: schema.undef,
			path: schema.undef
		},
		parseFloat(float, {longitude: true})
	)
	t.end()
})


