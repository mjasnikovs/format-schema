const test = require('tape')
const schema = require('tape-schema')

const {
	notUndef,
	notEmpty,
	notZero,
	isEmail,
	isNaturalNumber,
	isInteger,
	isFloat,
	isString,
	isBoolean,
	isLatitude,
	isLongitude
} = require('../src/validators')

test('notUndef', t => {
	t.plan(12)
	schema.test(t,
		{
			null: notUndef(null),
			undefined: notUndef(),
			emptyString: notUndef(''),
			string: notUndef('string'),
			number: notUndef(1),
			float: notUndef(0.111),
			nan: notUndef(NaN),
			infinity: notUndef(Infinity),
			booleanTrue: notUndef(true),
			booleanFalse: notUndef(false),
			zero: notUndef(0),
			zeroMinus: notUndef(-0)
		},
		{
			null: true,
			undefined: false,
			emptyString: true,
			string: true,
			number: true,
			float: true,
			nan: true,
			infinity: true,
			booleanTrue: true,
			booleanFalse: true,
			zero: true,
			zeroMinus: true
		})
})

test('notEmpty', t => {
	t.plan(12)
	schema.test(t,
		{
			null: notEmpty(null),
			undefined: notEmpty(),
			emptyString: notEmpty(''),
			string: notEmpty('string'),
			number: notEmpty(1),
			float: notEmpty(0.111),
			nan: notEmpty(NaN),
			infinity: notEmpty(Infinity),
			booleanTrue: notEmpty(true),
			booleanFalse: notEmpty(false),
			zero: notEmpty(0),
			zeroMinus: notEmpty(-0)
		},
		{
			null: false,
			undefined: false,
			emptyString: false,
			string: true,
			number: true,
			float: true,
			nan: true,
			infinity: true,
			booleanTrue: true,
			booleanFalse: true,
			zero: true,
			zeroMinus: true
		})
})

test('notZero', t => {
	t.plan(12)
	schema.test(t,
		{
			null: notZero(null),
			undefined: notZero(),
			emptyString: notZero(''),
			string: notZero('string'),
			number: notZero(1),
			float: notZero(0.111),
			nan: notZero(NaN),
			infinity: notZero(Infinity),
			booleanTrue: notZero(true),
			booleanFalse: notZero(false),
			zero: notZero(0),
			zeroMinus: notZero(-0)
		},
		{
			null: true,
			undefined: true,
			emptyString: true,
			string: true,
			number: true,
			float: true,
			nan: true,
			infinity: true,
			booleanTrue: true,
			booleanFalse: true,
			zero: false,
			zeroMinus: false
		})
})

test('isEmail', t => {
	t.plan(16)
	schema.test(t,
		{
			null: isEmail(null),
			undefined: isEmail(),
			emptyString: isEmail(''),
			string: isEmail('string'),
			number: isEmail(1),
			float: isEmail(0.111),
			nan: isEmail(NaN),
			infinity: isEmail(Infinity),
			booleanTrue: isEmail(true),
			booleanFalse: isEmail(false),
			zero: isEmail(0),
			zeroMinus: isEmail(-0),
			email: isEmail('test@test.com'),
			emailSubdomain: isEmail('test.test@test.com'),
			emailNoEnd: isEmail('test@test'),
			emailDoubleAt: isEmail('test@test@test.com')
		},
		{
			null: false,
			undefined: false,
			emptyString: false,
			string: false,
			number: false,
			float: false,
			nan: false,
			infinity: false,
			booleanTrue: false,
			booleanFalse: false,
			zero: false,
			zeroMinus: false,
			email: true,
			emailSubdomain: true,
			emailNoEnd: false,
			emailDoubleAt: false
		})
})

test('isNaturalNumber', t => {
	t.plan(12)
	schema.test(t,
		{
			null: isNaturalNumber(null),
			undefined: isNaturalNumber(),
			emptyString: isNaturalNumber(''),
			string: isNaturalNumber('string'),
			number: isNaturalNumber(1),
			float: isNaturalNumber(0.111),
			nan: isNaturalNumber(NaN),
			infinity: isNaturalNumber(Infinity),
			booleanTrue: isNaturalNumber(true),
			booleanFalse: isNaturalNumber(false),
			zero: isNaturalNumber(0),
			zeroMinus: isNaturalNumber(-0)
		},
		{
			null: false,
			undefined: false,
			emptyString: false,
			string: false,
			number: true,
			float: false,
			nan: false,
			infinity: false,
			booleanTrue: false,
			booleanFalse: false,
			zero: true,
			zeroMinus: false
		})
})

test('isInteger', t => {
	t.plan(12)
	schema.test(t,
		{
			null: isInteger(null),
			undefined: isInteger(),
			emptyString: isInteger(''),
			string: isInteger('string'),
			number: isInteger(1),
			float: isInteger(0.111),
			nan: isInteger(NaN),
			infinity: isInteger(Infinity),
			booleanTrue: isInteger(true),
			booleanFalse: isInteger(false),
			zero: isInteger(0),
			zeroMinus: isInteger(-0)
		},
		{
			null: false,
			undefined: false,
			emptyString: false,
			string: false,
			number: true,
			float: false,
			nan: false,
			infinity: false,
			booleanTrue: false,
			booleanFalse: false,
			zero: true,
			zeroMinus: true
		})
})

test('isFloat', t => {
	t.plan(12)
	schema.test(t,
		{
			null: isFloat(null),
			undefined: isFloat(),
			emptyString: isFloat(''),
			string: isFloat('string'),
			number: isFloat(1),
			float: isFloat(0.111),
			nan: isFloat(NaN),
			infinity: isFloat(Infinity),
			booleanTrue: isFloat(true),
			booleanFalse: isFloat(false),
			zero: isFloat(0),
			zeroMinus: isFloat(-0)
		},
		{
			null: false,
			undefined: false,
			emptyString: false,
			string: false,
			number: true,
			float: true,
			nan: false,
			infinity: false,
			booleanTrue: false,
			booleanFalse: false,
			zero: true,
			zeroMinus: true
		})
})

test('isString', t => {
	t.plan(12)
	schema.test(t,
		{
			null: isString(null),
			undefined: isString(),
			emptyString: isString(''),
			string: isString('string'),
			number: isString(1),
			float: isString(0.111),
			nan: isString(NaN),
			infinity: isString(Infinity),
			booleanTrue: isString(true),
			booleanFalse: isString(false),
			zero: isString(0),
			zeroMinus: isString(-0)
		},
		{
			null: false,
			undefined: false,
			emptyString: true,
			string: true,
			number: false,
			float: false,
			nan: false,
			infinity: false,
			booleanTrue: false,
			booleanFalse: false,
			zero: false,
			zeroMinus: false
		})
})

test('isBoolean', t => {
	t.plan(12)
	schema.test(t,
		{
			null: isBoolean(null),
			undefined: isBoolean(),
			emptyString: isBoolean(''),
			string: isBoolean('string'),
			number: isBoolean(1),
			float: isBoolean(0.111),
			nan: isBoolean(NaN),
			infinity: isBoolean(Infinity),
			booleanTrue: isBoolean(true),
			booleanFalse: isBoolean(false),
			zero: isBoolean(0),
			zeroMinus: isBoolean(-0)
		},
		{
			null: false,
			undefined: false,
			emptyString: false,
			string: false,
			number: false,
			float: false,
			nan: false,
			infinity: false,
			booleanTrue: true,
			booleanFalse: true,
			zero: false,
			zeroMinus: false
		})
})

test('isLatitude', t => {
	t.plan(14)
	schema.test(t,
		{
			null: isLatitude(null),
			undefined: isLatitude(),
			emptyString: isLatitude(''),
			string: isLatitude('string'),
			number: isLatitude(1),
			float: isLatitude(0.111),
			nan: isLatitude(NaN),
			infinity: isLatitude(Infinity),
			booleanTrue: isLatitude(true),
			booleanFalse: isLatitude(false),
			zero: isLatitude(0),
			zeroMinus: isLatitude(-0),
			latitudeSmall: isLatitude(-91),
			latitudeBig: isLatitude(91)
		},
		{
			null: false,
			undefined: false,
			emptyString: false,
			string: false,
			number: true,
			float: true,
			nan: false,
			infinity: false,
			booleanTrue: false,
			booleanFalse: false,
			zero: true,
			zeroMinus: true,
			latitudeSmall: false,
			latitudeBig: false
		})
})


test('isLongitude', t => {
	t.plan(14)
	schema.test(t,
		{
			null: isLongitude(null),
			undefined: isLongitude(),
			emptyString: isLongitude(''),
			string: isLongitude('string'),
			number: isLongitude(1),
			float: isLongitude(0.111),
			nan: isLongitude(NaN),
			infinity: isLongitude(Infinity),
			booleanTrue: isLongitude(true),
			booleanFalse: isLongitude(false),
			zero: isLongitude(0),
			zeroMinus: isLongitude(-0),
			longitudeSmall: isLongitude(-181),
			longitudeBig: isLongitude(181)
		},
		{
			null: false,
			undefined: false,
			emptyString: false,
			string: false,
			number: true,
			float: true,
			nan: false,
			infinity: false,
			booleanTrue: false,
			booleanFalse: false,
			zero: true,
			zeroMinus: true,
			longitudeSmall: false,
			longitudeBig: false
		})
})
