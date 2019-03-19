const test = require('tape')
const schema = require('tape-schema')

const {
	booleanFormat
} = require('../dist')

const {
	NAMESPACE_DEFAULT_NAME
} = require('../dist/types')

const fake = {}

test('booleanFormat undefined pass', t => {
	schema.test(t, schema.undef, booleanFormat()(fake.undefined))
	t.end()
})

test('booleanFormat notUndef fail', t => {
	const e = booleanFormat({notUndef: true})(fake.undefined)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "undefined". Expected boolean, found undefined value.`)
	t.end()
})

test('booleanFormat null pass', t => {
	schema.test(t, null, booleanFormat()(null))
	t.end()
})

test('booleanFormat notEmpty null fail', t => {
	const e = booleanFormat({notEmpty: true})(null)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "null". Expected non-empty boolean, found "null".`)
	t.end()
})

test('booleanFormat notEmpty \'\' fail', t => {
	const e = booleanFormat({notEmpty: true})('')
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "". Expected non-empty boolean, found "".`)
	t.end()
})

test('booleanFormat notEmpty undefined fail', t => {
	const e = booleanFormat({notEmpty: true})(fake.undefined)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "undefined". Expected non-empty boolean, found "undefined".`)
	t.end()
})

test('booleanFormat fail', t => {
	const e = booleanFormat()(4)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "4". Expected boolean, found "4".`)
	t.end()
})

test('booleanFormat max pass', t => {
	schema.test(t, true, booleanFormat()(true))
	t.end()
})
