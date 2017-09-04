const test = require('tape')
const schema = require('tape-schema')
const parseString = require('../src/string')

test('string', t => {
	const string = 'Hello, world.'
	schema.test(t,
		string,
		parseString(string)
	)
	t.end()
})

test('string from number', t => {
	const string = 2147483648
	schema.test(t,
		String(string),
		parseString(string)
	)
	t.end()
})

test('string Array error', t => {
	const string = []
	schema.test(t,
		{
			message: 'Argument "String" cannot represent an array value: []',
			locations: schema.undef,
			path: schema.undef
		},
		parseString(string)
	)
	t.end()
})

test('string trim', t => {
	const string = ' Hello, world. '
	schema.test(t,
		string.trim(),
		parseString(string, {trim: true})
	)
	t.end()
})

test('string trimLeft', t => {
	const string = ' Hello, world. '
	schema.test(t,
		string.trimLeft(),
		parseString(string, {trimLeft: true})
	)
	t.end()
})

test('string trimRight', t => {
	const string = ' Hello, world. '
	schema.test(t,
		string.trimRight(),
		parseString(string, {trimRight: true})
	)
	t.end()
})

test('string toLowerCase', t => {
	const string = ' Hello, world. '
	schema.test(t,
		string.toLowerCase(),
		parseString(string, {toLowerCase: true})
	)
	t.end()
})

test('string toUpperCase', t => {
	const string = ' Hello, world. '
	schema.test(t,
		string.toUpperCase(),
		parseString(string, {toUpperCase: true})
	)
	t.end()
})

test('string truncate', t => {
	const string = ' Hello, world. '
	schema.test(t,
		string.slice(0, 5),
		parseString(string, {truncate: 5})
	)
	t.end()
})

test('string capitalize: words', t => {
	const string = ' hello, world. '
	schema.test(t,
		' Hello, World. ',
		parseString(string, {capitalize: 'words'})
	)
	t.end()
})

test('string capitalize: sentences', t => {
	const string = 'hello, world. my friend!. hello.'
	schema.test(t,
		'Hello, world. My friend!. Hello.',
		parseString(string, {capitalize: 'sentences'})
	)
	t.end()
})

test('string capitalize: first', t => {
	const string = 'hello, world. '
	schema.test(t,
		'Hello, world. ',
		parseString(string, {capitalize: 'first'})
	)
	t.end()
})

test('string notEmpty', t => {
	const string = ''
	schema.test(t,
		{
			message: 'Argument "String" has invalid value "". Expected not-empty string, found "".',
			locations: schema.undef,
			path: schema.undef
		},
		parseString(string, {notEmpty: true})
	)
	t.end()
})

test('string empty', t => {
	const string = ''
	schema.test(t,
		'',
		parseString(string)
	)
	t.end()
})

test('string min', t => {
	const string = '123456'
	schema.test(t,
		string,
		parseString(string, {min: 6})
	)
	t.end()
})

test('string min error', t => {
	const string = '1234'
	schema.test(t,
		{
			message: 'Argument "String" has invalid value "1234". Expected minimum length of 5 characters, found "4".',
			locations: schema.undef,
			path: schema.undef
		},
		parseString(string, {min: 5})
	)
	t.end()
})

test('string max', t => {
	const string = '123456'
	schema.test(t,
		string,
		parseString(string, {max: 6})
	)
	t.end()
})

test('string max error', t => {
	const string = '123456'
	schema.test(t,
		{
			message: 'Argument "String" has invalid value "123456". Expected maximum length of 5 characters, found "6".',
			locations: schema.undef,
			path: schema.undef
		},
		parseString(string, {max: 5})
	)
	t.end()
})

test('string email', t => {
	const string = 'test@test.com'
	schema.test(t,
		string,
		parseString(string, {email: true})
	)
	t.end()
})

test('string email empty', t => {
	const string = ''
	schema.test(t,
		string,
		parseString(string, {email: true})
	)
	t.end()
})

test('string email required', t => {
	const string = ''
	schema.test(t,
		{
			message: 'Argument "String" has invalid value "". Expected not-empty string, found "".',
			locations: schema.undef,
			path: schema.undef
		},
		parseString(string, {email: true, notEmpty: true})
	)
	t.end()
})

test('string email with subdomain', t => {
	const string = 'test.test@test.com'
	schema.test(t,
		string,
		parseString(string, {email: true})
	)
	t.end()
})

test('string email error', t => {
	const string = 'test@test'
	schema.test(t,
		{
			message: 'Argument "String" has invalid value "test@test". Expected valid email, found "test@test".',
			locations: schema.undef,
			path: schema.undef
		},
		parseString(string, {email: true})
	)
	t.end()
})

test('string email error @', t => {
	const string = 'test@test@test.com'
	schema.test(t,
		{
			message: 'Argument "String" has invalid value "test@test@test.com". Expected valid email, found "test@test@test.com".',
			locations: schema.undef,
			path: schema.undef
		},
		parseString(string, {email: true})
	)
	t.end()
})

test('string null pass', t => {
	const string = null
	schema.test(t,
		string,
		parseString(string)
	)
	t.end()
})

test('string fail null pass', t => {
	const string = null
	schema.test(t,
		{
			message: 'Argument "String" has invalid value "". Expected not-empty string, found "".',
			locations: schema.undef,
			path: schema.undef
		},
		parseString(string, {email: true, notEmpty: true})
	)
	t.end()
})
