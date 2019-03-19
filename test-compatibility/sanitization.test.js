const test = require('tape')
const schema = require('tape-schema')

const {
	trim,
	trimLeft,
	trimRight,
	toLowerCase,
	toUpperCase,
	truncate,
	capitalize
} = require('../dist')

test('trim', t => {
	t.plan(1)
	schema.test(t,
		{string: trim(' string ')},
		{string: 'string'}
	)
})

test('trimLeft', t => {
	t.plan(1)
	schema.test(t,
		{string: trimLeft(' string ')},
		{string: 'string '}
	)
})

test('trimRight', t => {
	t.plan(1)
	schema.test(t,
		{string: trimRight(' string ')},
		{string: ' string'}
	)
})

test('toLowerCase', t => {
	t.plan(1)
	schema.test(t,
		{string: toLowerCase(' STRING ')},
		{string: ' string '}
	)
})

test('toUpperCase', t => {
	t.plan(1)
	schema.test(t,
		{string: toUpperCase(' string ')},
		{string: ' STRING '}
	)
})

test('truncate', t => {
	t.plan(1)
	schema.test(t,
		{string: truncate(' string ', 3)},
		{string: ' st'}
	)
})

test('capitalize', t => {
	t.plan(3)
	schema.test(t,
		{
			words: capitalize('string string', 'words'),
			sentences: capitalize('string. string.', 'sentences'),
			first: capitalize('string. string.', 'first')
		},
		{
			words: 'String String',
			sentences: 'String. String.',
			first: 'String. string.'
		}
	)
})

