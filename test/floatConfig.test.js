const test = require('tape')
const schema = require('tape-schema')

const {
	floatFormat
} = require('../src/formats')

test('floatFormat invalid type (array) config param', t => {
	try {
		floatFormat([])
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. Configuration is invalid. Expected object, found "".')
		t.end()
	}
})

test('floatFormat invalid type (string) config param', t => {
	try {
		floatFormat('string')
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. Configuration is invalid. Expected object, found "string".')
		t.end()
	}
})

test('floatFormat invalid config param', t => {
	try {
		floatFormat({error: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. Configuration is invalid, param "error" not found. Expected valid configuration object, found invalid key "error".')
		t.end()
	}
})

test('floatFormat invalid config name', t => {
	try {
		floatFormat({name: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "name" param has invalid value "1". Expected string, found "1".')
		t.end()
	}
})

test('floatFormat invalid config notUndef', t => {
	try {
		floatFormat({notUndef: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "notUndef" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

test('floatFormat invalid config notEmpty', t => {
	try {
		floatFormat({notEmpty: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "notEmpty" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

test('floatFormat invalid config enum', t => {
	try {
		floatFormat({enum: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "enum" param has invalid value "1". Expected false or array, found "1".')
		t.end()
	}
})

test('floatFormat invalid config enum array', t => {
	try {
		floatFormat({enum: ['string']})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "enum" param has invalid value "[string]". Expected array with floats, found "[string]".')
		t.end()
	}
})

test('floatFormat invalid config min', t => {
	try {
		floatFormat({min: 'string'})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "min" param has invalid value "string". Expected false or float, found "string".')
		t.end()
	}
})

test('floatFormat invalid config max', t => {
	try {
		floatFormat({max: 'string'})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "max" param has invalid value "string". Expected false or float, found "string".')
		t.end()
	}
})

test('floatFormat invalid config notZero', t => {
	try {
		floatFormat({notZero: 'string'})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "notZero" param has invalid value "string". Expected boolean, found "string".')
		t.end()
	}
})


