const test = require('tape')
const schema = require('tape-schema')

const {
	format,
	stringFormat,
	integerFormat
} = require('../src/index.js')


test('single value test', t => {
	const stringTest = stringFormat({capitalize: 'words'})
	const result = stringTest('edgars')
	schema.test(t, 'Edgars', result)
	t.end()
})

test('Schema value test', t => {
	const formatTest = format({
		name: stringFormat({capitalize: 'words', min: 2, max: 20, trim: true, notEmpty: true}),
		age: integerFormat({min: 18, max: 99, notEmpty: true}),
		friends: [integerFormat({naturalNumber: true, notZero: true})]
	})

	const inputs = {
		name: ' edgars ',
		age: 19,
		friends: [10, 11, 12]
	}

	const result = formatTest(inputs)

	const resultTest = {
		name: 'Edgars',
		age: 19,
		friends: [10, 11, 12]
	}

	schema.test(t, resultTest, result)
	t.end()
})

