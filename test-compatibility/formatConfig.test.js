const test = require('tape')
const schema = require('tape-schema')

const {
	format
} = require('../dist')

test('format schema error undefined', t => {
	try {
		format()
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format schema error. Configuration is invalid. Expected function, found "undefined".')
		t.end()
	}
})

test('format schema error non-object or array', t => {
	try {
		format(1)
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format schema error. Configuration is invalid. Expected function, found "1".')
		t.end()
	}
})

test('format schema error empty object', t => {
	try {
		format({})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format schema error. Configuration is invalid. Expected non-empty object, found "{}".')
		t.end()
	}
})

test('format schema error empty array', t => {
	try {
		format([])
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format schema error. Configuration is invalid. Expected non-empty array, found "[]".')
		t.end()
	}
})

test('format schema error wrong object', t => {
	try {
		format({error: 1})
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format schema error. Configuration is invalid. Expected function, found "1".')
		t.end()
	}
})

test('format schema error wrong array', t => {
	try {
		format([1])
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format schema error. Configuration is invalid. Expected function, found "1".')
		t.end()
	}
})

test('format schema error wrong deep object', t => {
	try {
		format([{error: 1}])
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format schema error. Configuration is invalid. Expected function, found "1".')
		t.end()
	}
})

test('format schema error wrong deep-deep object', t => {
	try {
		format([[{error: 1}]])
		t.end('no error')
	} catch (e) {
		schema.test(t, e.message, 'Format schema error. Configuration is invalid. Expected function, found "1".')
		t.end()
	}
})
