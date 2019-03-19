const test = require('tape')
const schema = require('tape-schema')

const {
	stringFormat
} = require('../dist')

const {
	NAMESPACE_DEFAULT_NAME
} = require('../dist/types')

const fake = {}

test('stringFormat undefined pass', t => {
	schema.test(t, schema.undef, stringFormat()(fake.undefined))
	t.end()
})

test('stringFormat notUndef fail', t => {
	const e = stringFormat({notUndef: true})(fake.undefined)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "undefined". Expected string, found undefined value.`)
	t.end()
})

test('stringFormat null pass', t => {
	schema.test(t, null, stringFormat()(null))
	t.end()
})

test('stringFormat notEmpty null fail', t => {
	const e = stringFormat({notEmpty: true})(null)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "null". Expected non-empty string, found "null".`)
	t.end()
})

test('stringFormat notEmpty \'\' fail', t => {
	const e = stringFormat({notEmpty: true})('')
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "". Expected non-empty string, found "".`)
	t.end()
})

test('stringFormat notEmpty undefined fail', t => {
	const e = stringFormat({notEmpty: true})(fake.undefined)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "undefined". Expected non-empty string, found "undefined".`)
	t.end()
})

test('stringFormat max fail', t => {
	const e = stringFormat({max: 3})('1234')
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "1234". Expected maximal length of "3" characters, found "4" characters.`)
	t.end()
})

test('stringFormat max pass', t => {
	schema.test(t, '1234', stringFormat({max: 4})('1234'))
	t.end()
})

test('stringFormat min fail', t => {
	const e = stringFormat({min: 4})('123')
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "123". Expected minimal length of "4" characters, found "3" characters.`)
	t.end()
})

test('stringFormat min pass', t => {
	schema.test(t, '1234', stringFormat({min: 3})('1234'))
	t.end()
})

test('stringFormat enum fail', t => {
	const e = stringFormat({enum: ['1', '2']})('3')
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "3". Expected one of string values "1,2", found "3".`)
	t.end()
})

test('stringFormat enum pass', t => {
	schema.test(t, '1', stringFormat({enum: ['1', '2']})('1'))
	t.end()
})

test('stringFormat email fail', t => {
	const e = stringFormat({email: true})('test@test')
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "test@test". Expected email, found "test@test".`)
	t.end()
})

test('stringFormat email fail', t => {
	const e = stringFormat({email: true})('test@test@test.lv')
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "test@test@test.lv". Expected email, found "test@test@test.lv".`)
	t.end()
})

test('stringFormat email pass', t => {
	schema.test(t, 'test@test.lv', stringFormat({email: true})('test@test.lv'))
	t.end()
})

test('stringFormat email pass', t => {
	schema.test(t, 'test.test@test.lv', stringFormat({email: true})('test.test@test.lv'))
	t.end()
})

test('stringFormat trim', t => {
	schema.test(t, 'string', stringFormat({trim: true})(' string '))
	t.end()
})

test('stringFormat trimLeft', t => {
	schema.test(t, 'string ', stringFormat({trimLeft: true})(' string '))
	t.end()
})

test('stringFormat trimRight', t => {
	schema.test(t, ' string', stringFormat({trimRight: true})(' string '))
	t.end()
})

test('stringFormat toLowerCase', t => {
	schema.test(t, 'string', stringFormat({toLowerCase: true})('STRING'))
	t.end()
})

test('stringFormat toUpperCase', t => {
	schema.test(t, 'STRING', stringFormat({toUpperCase: true})('string'))
	t.end()
})

test('stringFormat truncate', t => {
	schema.test(t, 'st', stringFormat({truncate: 2})('string'))
	t.end()
})

test('stringFormat capitalize "words"', t => {
	schema.test(t, 'String String', stringFormat({capitalize: 'words'})('string string'))
	t.end()
})

test('stringFormat capitalize "sentences"', t => {
	schema.test(t, 'String. String.', stringFormat({capitalize: 'sentences'})('string. string.'))
	t.end()
})

test('stringFormat capitalize "first"', t => {
	schema.test(t, 'String. string.', stringFormat({capitalize: 'first'})('string. string.'))
	t.end()
})

test('stringFormat test fail', t => {
	const e = stringFormat({test: /aaa/})('bbb')
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "bbb". Expected valid regular expression test (/aaa/), found "bbb".`)
	t.end()
})

test('stringFormat test pass', t => {
	schema.test(t, 'aaa', stringFormat({test: /aaa/})('aaa'))
	t.end()
})
