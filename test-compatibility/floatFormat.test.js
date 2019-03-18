const test = require('tape')
const schema = require('tape-schema')

const {
	NAMESPACE_DEFAULT_NAME
} = require('../src/types')

const {
	floatFormat
} = require('../src/formats')

const fake = {}

test('floatFormat undefined pass', t => {
	schema.test(t, schema.undef, floatFormat()(fake.undefined))
	t.end()
})

test('floatFormat notUndef fail', t => {
	const e = floatFormat({notUndef: true})(fake.undefined)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "undefined". Expected float, found undefined value.`)
	t.end()
})

test('floatFormat null pass', t => {
	schema.test(t, null, floatFormat()(null))
	t.end()
})

test('floatFormat notEmpty null fail', t => {
	const e = floatFormat({notEmpty: true})(null)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "null". Expected non-empty float, found "null".`)
	t.end()
})

test('floatFormat notEmpty \'\' fail', t => {
	const e = floatFormat({notEmpty: true})('')
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "". Expected non-empty float, found "".`)
	t.end()
})

test('floatFormat notEmpty undefined fail', t => {
	const e = floatFormat({notEmpty: true})(fake.undefined)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "undefined". Expected non-empty float, found "undefined".`)
	t.end()
})

test('floatFormat max fail', t => {
	const e = floatFormat({max: 3})(4)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "4". Expected maximal value "3", found "4".`)
	t.end()
})

test('floatFormat max pass', t => {
	schema.test(t, 3, floatFormat({max: 4})(3))
	t.end()
})

test('floatFormat min fail', t => {
	const e = floatFormat({min: 3})(2)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "2". Expected minimal value "3", found "2".`)
	t.end()
})

test('floatFormat min pass', t => {
	schema.test(t, 3, floatFormat({min: 3})(3))
	t.end()
})

test('floatFormat enum fail', t => {
	const e = floatFormat({enum: [1.1, 2.2]})(3.3)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "3.3". Expected one of float values "1.1,2.2", found "3.3".`)
	t.end()
})

test('floatFormat enum pass', t => {
	schema.test(t, 1, floatFormat({enum: [1, 2]})(1))
	t.end()
})

test('floatFormat notZero fail', t => {
	const e = floatFormat({notZero: true})(0)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "0". Expected non-zero float, found "0".`)
	t.end()
})

test('floatFormat notZero pass', t => {
	schema.test(t, 3, floatFormat({notZero: true})(3))
	t.end()
})

test('floatFormat positive fail', t => {
	const e = floatFormat({positive: true})(-1)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "-1". Expected positive float, found "-1".`)
	t.end()
})

test('floatFormat positive pass', t => {
	schema.test(t, 3, floatFormat({positive: true})(3))
	t.end()
})

test('floatFormat latitude fail', t => {
	const e = floatFormat({latitude: true})(-91)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "-91". Expected latitude, found "-91".`)
	t.end()
})

test('floatFormat latitude pass', t => {
	schema.test(t, 3, floatFormat({latitude: true})(3))
	t.end()
})

test('floatFormat longitude fail', t => {
	const e = floatFormat({longitude: true})(-191)
	schema.test(t, e.message, `Format error. "${NAMESPACE_DEFAULT_NAME}" has invalid value "-191". Expected longitude, found "-191".`)
	t.end()
})

test('floatFormat longitude pass', t => {
	schema.test(t, 3, floatFormat({longitude: true})(3))
	t.end()
})
