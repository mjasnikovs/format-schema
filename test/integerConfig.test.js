const test = require('tape')
const schema = require('tape-schema')

const {
	integerFormat
} = require('../src/formats')

test('integerFormat invalid type (array) config param', t => {
	try {
		integerFormat([])
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. Configuration is invalid. Expected object, found "".')
		t.end()
	}
})

test('integerFormat invalid type (string) config param', t => {
	try {
		integerFormat('string')
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. Configuration is invalid. Expected object, found "string".')
		t.end()
	}
})

test('integerFormat invalid config param', t => {
	try {
		integerFormat({error: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. Configuration is invalid, param "error" not found. Expected valid configuration object, found invalid key "error".')
		t.end()
	}
})

test('integerFormat invalid config name', t => {
	try {
		integerFormat({name: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "name" param has invalid value "1". Expected string, found "1".')
		t.end()
	}
})

test('integerFormat invalid config notUndef', t => {
	try {
		integerFormat({notUndef: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "notUndef" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

test('integerFormat invalid config notEmpty', t => {
	try {
		integerFormat({notEmpty: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "notEmpty" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

test('integerFormat invalid config enum', t => {
	try {
		integerFormat({enum: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "enum" param has invalid value "1". Expected false or array, found "1".')
		t.end()
	}
})

test('integerFormat invalid config enum array', t => {
	try {
		integerFormat({enum: ['string']})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "enum" param has invalid value "[string]". Expected array with integers, found "[string]".')
		t.end()
	}
})

test('integerFormat invalid config min', t => {
	try {
		integerFormat({min: 'string'})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "min" param has invalid value "string". Expected false or integer, found "string".')
		t.end()
	}
})

test('integerFormat invalid config max', t => {
	try {
		integerFormat({max: 'string'})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "max" param has invalid value "string". Expected false or integer, found "string".')
		t.end()
	}
})

test('integerFormat invalid config naturalNumber', t => {
	try {
		integerFormat({naturalNumber: 'string'})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "naturalNumber" param has invalid value "string". Expected boolean, found "string".')
		t.end()
	}
})

test('integerFormat invalid config notZero', t => {
	try {
		integerFormat({notZero: 'string'})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "notZero" param has invalid value "string". Expected boolean, found "string".')
		t.end()
	}
})


