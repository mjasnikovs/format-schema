const test = require('tape')
const schema = require('tape-schema')

const {
	stringFormat
} = require('../src/formats')

test('stringFormat invalid type (array) config param', t => {
	try {
		stringFormat([])
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. Configuration is invalid. Expected object, found "".')
		t.end()
	}
})

test('stringFormat invalid type (string) config param', t => {
	try {
		stringFormat('string')
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. Configuration is invalid. Expected object, found "string".')
		t.end()
	}
})

test('stringFormat invalid config param', t => {
	try {
		stringFormat({error: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. Configuration is invalid, param "error" not found. Expected valid configuration object, found invalid key "error".')
		t.end()
	}
})

test('stringFormat invalid config name', t => {
	try {
		stringFormat({name: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "name" param has invalid value "1". Expected string, found "1".')
		t.end()
	}
})

test('stringFormat invalid config trim', t => {
	try {
		stringFormat({trim: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "trim" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

test('stringFormat invalid config trimLeft', t => {
	try {
		stringFormat({trimLeft: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "trimLeft" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

test('stringFormat invalid config trimRight', t => {
	try {
		stringFormat({trimRight: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "trimRight" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

test('stringFormat invalid config toLowerCase', t => {
	try {
		stringFormat({toLowerCase: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "toLowerCase" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

test('stringFormat invalid config toUpperCase', t => {
	try {
		stringFormat({toUpperCase: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "toUpperCase" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

test('stringFormat invalid config toLowerCase && toUpperCase = true', t => {
	try {
		stringFormat({toUpperCase: true, toLowerCase: true})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "toUpperCase" and "toLowerCase" params can\'t be true at the same time.')
		t.end()
	}
})

test('stringFormat invalid config truncate', t => {
	try {
		stringFormat({truncate: 'string'})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "truncate" param has invalid value "string". Expected false or natural number, found "string".')
		t.end()
	}
})

test('stringFormat invalid config capitalize', t => {
	try {
		stringFormat({capitalize: 'string'})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "capitalize" param has invalid value "string". Expected false, "words", "sentences" or "first", found "string".')
		t.end()
	}
})

test('stringFormat invalid config notUndef', t => {
	try {
		stringFormat({notUndef: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "notUndef" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

test('stringFormat invalid config notEmpty', t => {
	try {
		stringFormat({notEmpty: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "notEmpty" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

test('stringFormat invalid config enum', t => {
	try {
		stringFormat({enum: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "enum" param has invalid value "1". Expected false or array, found "1".')
		t.end()
	}
})

test('stringFormat invalid config enum array', t => {
	try {
		stringFormat({enum: [1]})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "enum" param has invalid value "[1]". Expected array with strings, found "[1]".')
		t.end()
	}
})

test('stringFormat invalid config min', t => {
	try {
		stringFormat({min: 'string'})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "min" param has invalid value "string". Expected false or natural number, found "string".')
		t.end()
	}
})

test('stringFormat invalid config max', t => {
	try {
		stringFormat({max: 'string'})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "max" param has invalid value "string". Expected false or natural number, found "string".')
		t.end()
	}
})

test('stringFormat invalid config email', t => {
	try {
		stringFormat({email: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format configuration error. "email" param has invalid value "1". Expected boolean, found "1".')
		t.end()
	}
})

