import test from 'tape'

import {
	postgresFormat,
	postgresPromiseFormat,
	stringFormat,
	booleanFormat,
	integerFormat,
	floatFormat,
	notUndef
} from '../src'

test('postgresFormat valid', t => {
	const test = postgresFormat({
		string: stringFormat(),
		boolean: booleanFormat(),
		integer: integerFormat(),
		float: floatFormat()
	})

	const object = {
		string: 'string',
		boolean: true,
		integer: 1,
		float: 1.1	
	}

	const objectResult = {
		string: { value: 'string', key: 'string', type: 'text' },
		boolean: { value: true, key: 'boolean', type: 'boolean' },
		integer: { value: 1, key: 'integer', type: 'int' },
		float: { value: 1.1, key: 'float', type: 'numeric' }
	}

	const result = test(object)
	t.deepEqual(result, objectResult)
	t.end()
})

test('postgresFormat valid undefined', t => {
	const test = postgresFormat({
		string: stringFormat(),
		boolean: booleanFormat(),
		integer: integerFormat(),
		float: floatFormat()
	})

	const object = {
		string: undefined,
		boolean: undefined,
		integer: undefined,
		float: undefined	
	}

	const objectResult = {
		string: { value: undefined, key: 'string', type: 'text' },
		boolean: { value: undefined, key: 'boolean', type: 'boolean' },
		integer: { value: undefined, key: 'integer', type: 'int' },
		float: { value: undefined, key: 'float', type: 'numeric' }
	}

	const result = test(object)
	t.deepEqual(result, objectResult)
	t.end()
})

test('postgresFormat valid null', t => {
	const test = postgresFormat({
		string: stringFormat(),
		boolean: booleanFormat(),
		integer: integerFormat(),
		float: floatFormat()
	})

	const object = {
		string: null,
		boolean: null,
		integer: null,
		float: null	
	}

	const objectResult = {
		string: { value: null, key: 'string', type: 'text' },
		boolean: { value: null, key: 'boolean', type: 'boolean' },
		integer: { value: null, key: 'integer', type: 'int' },
		float: { value: null, key: 'float', type: 'numeric' }
	}

	const result = test(object)
	t.deepEqual(result, objectResult)
	t.end()
})

test('postgresFormat valid array', t => {
	const test = postgresFormat([{
		string: stringFormat(),
		boolean: booleanFormat(),
		integer: integerFormat(),
		float: floatFormat()
	}])

	const object = [{
		string: null,
		boolean: null,
		integer: null,
		float: null	
	}]

	const objectResult = [{
		string: { value: null, key: 'string', type: 'text' },
		boolean: { value: null, key: 'boolean', type: 'boolean' },
		integer: { value: null, key: 'integer', type: 'int' },
		float: { value: null, key: 'float', type: 'numeric' }
	}]

	const result = test(object)
	t.deepEqual(result, objectResult)
	t.end()
})

test('postgresFormat valid deep array', t => {
	const test = postgresFormat([[[stringFormat()]]])

	const object = [[['string']]]

	const objectResult =  [[[{value: 'string', key: 0, type: 'text'}]]]
	const result = test(object)
	t.deepEqual( result, objectResult)
	t.end()
})

test('postgresFormat valid deep array object', t => {
	const test = postgresFormat([[[{string: [stringFormat()]}]]])

	const object = [[[{string: ['string']}]]]
	const objectResult = [[[{string: [{value: 'string', key: 0, type: 'text'}]}]]]

	const result = test(object)

	t.deepEqual( result, objectResult)
	t.end()
})

test('postgresPromiseFormat success', async t => {
	const test = postgresPromiseFormat({
		string: stringFormat(),
		boolean: booleanFormat(),
		integer: integerFormat(),
		float: floatFormat()
	})

	const object = {
		string: 'string',
		boolean: true,
		integer: 1,
		float: 1.1	
	}

	const objectResult = {
		string: { value: 'string', key: 'string', type: 'text' },
		boolean: { value: true, key: 'boolean', type: 'boolean' },
		integer: { value: 1, key: 'integer', type: 'int' },
		float: { value: 1.1, key: 'float', type: 'numeric' }
	}

	try {
		const result = await test(object)
		t.deepEqual(result, objectResult)
		t.end()
	} catch(e) {
		t.end(e.message)
	}
})

test('postgresPromiseFormat success custom types', async t => {
	const test = postgresPromiseFormat({
		string: stringFormat({pgType: 'varchar'}),
		boolean: booleanFormat({pgType: 'bit'}),
		integer: integerFormat({pgType: 'smallint'}),
		float: floatFormat({pgType: 'double precision'})
	})

	const object = {
		string: 'string',
		boolean: true,
		integer: 1,
		float: 1.1	
	}

	const objectResult = {
		string: { value: 'string', key: 'string', type: 'varchar' },
		boolean: { value: true, key: 'boolean', type: 'bit' },
		integer: { value: 1, key: 'integer', type: 'smallint' },
		float: { value: 1.1, key: 'float', type: 'double precision' }
	}

	try {
		const result = await test(object)
		t.deepEqual(result, objectResult)
		t.end()
	} catch(e) {
		t.end(e.message)
	}
})

test('postgresPromiseFormat error class constructor', async t => {
	class CustomError extends Error {
		someCustomFunction() {}
	}

	const test = postgresPromiseFormat(stringFormat({notEmpty: true}), CustomError)

	try {
		const result = await test(null)
		t.end('no-error')
	} catch(e) {
		t.equal(e.message, 'Error: Format error. "NAMESPACE_DEFAULT_NAME" has invalid value "null". Expected non-empty string, found "null".')
		t.equal(typeof e.someCustomFunction, 'function')
		t.end()
	}
})
