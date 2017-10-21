const test = require('tape')
const schema = require('tape-schema')

const {
	integerFormat
} = require('../src/formats')

const {
	NAMESPACE_DEFAULT_NAME
} = require('../src/types')

const fake = {}

test('integerFormat undefined pass', t => {
	schema.test(t, schema.undef, integerFormat()(fake.undefined))
	t.end()
})

test('integerFormat notUndef fail', t => {
	const e = integerFormat({notUndef: true})(fake.undefined)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "undefined". Expected integer, found undefined value.`)
	t.end()
})

test('integerFormat null pass', t => {
	schema.test(t, null, integerFormat()(null))
	t.end()
})

test('integerFormat notEmpty null fail', t => {
	const e = integerFormat({notEmpty: true})(null)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "null". Expected non-empty integer, found "null".`)
	t.end()
})

test('integerFormat notEmpty \'\' fail', t => {
	const e = integerFormat({notEmpty: true})('')
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "". Expected non-empty integer, found "".`)
	t.end()
})

test('integerFormat notEmpty undefined fail', t => {
	const e = integerFormat({notEmpty: true})(fake.undefined)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "undefined". Expected non-empty integer, found "undefined".`)
	t.end()
})

test('integerFormat max fail', t => {
	const e = integerFormat({max: 3})(4)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "4". Expected maximal value "3", found "4".`)
	t.end()
})

test('integerFormat max pass', t => {
	schema.test(t, 3, integerFormat({max: 4})(3))
	t.end()
})

test('integerFormat min fail', t => {
	const e = integerFormat({min: 3})(2)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "2". Expected minimal value "3", found "2".`)
	t.end()
})

test('integerFormat min pass', t => {
	schema.test(t, 3, integerFormat({min: 3})(3))
	t.end()
})

test('integerFormat enum fail', t => {
	const e = integerFormat({enum: [1, 2]})(3)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "3". Expected one of integer values "1,2", found "3".`)
	t.end()
})

test('integerFormat enum pass', t => {
	schema.test(t, 1, integerFormat({enum: [1, 2]})(1))
	t.end()
})

test('integerFormat notZero fail', t => {
	const e = integerFormat({notZero: true})(0)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "0". Expected non-zero integer, found "0".`)
	t.end()
})

test('integerFormat notZero pass', t => {
	schema.test(t, 3, integerFormat({notZero: true})(3))
	t.end()
})

test('integerFormat naturalNumber fail', t => {
	const e = integerFormat({naturalNumber: true})(-2)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "-2". Expected natural number, found "-2".`)
	t.end()
})

test('integerFormat naturalNumber pass', t => {
	schema.test(t, 3, integerFormat({naturalNumber: true})(3))
	t.end()
})
