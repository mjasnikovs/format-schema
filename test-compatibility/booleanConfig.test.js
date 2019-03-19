const test = require('tape')
const schema = require('tape-schema')

const {
	booleanFormat
} = require('../dist')

test('booleanFormat invalid type (array) config param', t => {
	try {
		booleanFormat([])
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. Configuration is invalid. Expected object, found "".')
		t.end()
	}
})

test('booleanFormat invalid type (string) config param', t => {
	try {
		booleanFormat('string')
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. Configuration is invalid. Expected object, found "string".')
		t.end()
	}
})

test('booleanFormat invalid config param', t => {
	try {
		booleanFormat({error: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. Configuration is invalid, param "error" not found. Expected valid configuration object, found invalid key "error".')
		t.end()
	}
})

test('booleanFormat invalid config name', t => {
	try {
		booleanFormat({name: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "name" param has invalid value "1". Expected string, found "1".')
		t.end()
	}
})

test('booleanFormat invalid config notUndef', t => {
	try {
		booleanFormat({notUndef: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "notUndef" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

test('booleanFormat invalid config notEmpty', t => {
	try {
		booleanFormat({notEmpty: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "notEmpty" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})
