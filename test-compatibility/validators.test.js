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
	isLongitude,
	isMaxNumber,
	isMinNumber,
	isMaxString,
	isMinString,
	inEnum,
	isObject
} = require('../dist')

test('notUndef', t => {
	t.plan(15)
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
			zeroMinus: notUndef(-0),
			array: notUndef([]),
			object: notUndef({}),
			date: notUndef(new Date())
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
			zeroMinus: true,
			array: true,
			object: true,
			date: true
		})
})

test('notEmpty', t => {
	t.plan(15)
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
			zeroMinus: notEmpty(-0),
			array: notUndef([]),
			object: notUndef({}),
			date: notUndef(new Date())
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
			zeroMinus: true,
			array: true,
			object: true,
			date: true
		})
})

test('notZero', t => {
	t.plan(15)
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
			zeroMinus: notZero(-0),
			array: notZero([]),
			object: notZero({}),
			date: notZero(new Date())
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
			zeroMinus: false,
			array: true,
			object: true,
			date: true
		})
})

test('isEmail', t => {
	t.plan(19)
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
			emailDoubleAt: isEmail('test@test@test.com'),
			array: isEmail([]),
			object: isEmail({}),
			date: isEmail(new Date())
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
			emailDoubleAt: false,
			array: false,
			object: false,
			date: false
		})
})

test('isNaturalNumber', t => {
	t.plan(15)
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
			zeroMinus: isNaturalNumber(-0),
			array: isNaturalNumber([]),
			object: isNaturalNumber({}),
			date: isNaturalNumber(new Date())
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
			zeroMinus: false,
			array: false,
			object: false,
			date: false
		})
})

test('isInteger', t => {
	t.plan(15)
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
			zeroMinus: isInteger(-0),
			array: isInteger([]),
			object: isInteger({}),
			date: isInteger(new Date())
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
			zeroMinus: true,
			array: false,
			object: false,
			date: false
		})
})

test('isFloat', t => {
	t.plan(15)
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
			zeroMinus: isFloat(-0),
			array: isFloat([]),
			object: isFloat({}),
			date: isFloat(new Date())
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
			array: false,
			object: false,
			date: false
		})
})

test('isString', t => {
	t.plan(15)
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
			zeroMinus: isString(-0),
			array: isString([]),
			object: isString({}),
			date: isString(new Date())
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
			zeroMinus: false,
			array: false,
			object: false,
			date: false
		})
})

test('isBoolean', t => {
	t.plan(15)
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
			zeroMinus: isBoolean(-0),
			array: isBoolean([]),
			object: isBoolean({}),
			date: isBoolean(new Date())
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
			zeroMinus: false,
			array: false,
			object: false,
			date: false
		})
})

test('isLatitude', t => {
	t.plan(17)
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
			latitudeBig: isLatitude(91),
			array: isLatitude([]),
			object: isLatitude({}),
			date: isLatitude(new Date())
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
			latitudeBig: false,
			array: false,
			object: false,
			date: false
		})
})


test('isLongitude', t => {
	t.plan(17)
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
			longitudeBig: isLongitude(181),
			array: isLongitude([]),
			object: isLongitude({}),
			date: isLongitude(new Date())
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
			longitudeBig: false,
			array: false,
			object: false,
			date: false
		})
})

test('MinMax', t => {
	t.plan(8)
	schema.test(t,
		{
			isMaxNumber: isMaxNumber(1, 1),
			isMinNumber: isMinNumber(1, 1),
			isMaxString: isMaxString('string', 6),
			isMinString: isMinString('string', 6),
			isMaxNumberFalse: isMaxNumber(2, 1),
			isMinNumberFalse: isMinNumber(0, 1),
			isMaxStringFalse: isMaxString('strings', 6),
			isMinStringFalse: isMinString('strin', 6)
		},
		{
			isMaxNumber: true,
			isMinNumber: true,
			isMaxString: true,
			isMinString: true,
			isMaxNumberFalse: false,
			isMinNumberFalse: false,
			isMaxStringFalse: false,
			isMinStringFalse: false
		}
	)
})

test('inEnum', t => {
	t.plan(2)
	schema.test(t,
		{
			enumTrue: inEnum(1, [1, 2, 3]),
			enumFalse: inEnum(4, [1, 2, 3])
		},
		{
			enumTrue: true,
			enumFalse: false
		}
	)
})

test('isObject', t => {
	t.plan(16)
	schema.test(t,
		{
			null: isObject(null),
			undefined: isObject(),
			emptyString: isObject(''),
			string: isObject('string'),
			number: isObject(1),
			float: isObject(0.111),
			nan: isObject(NaN),
			infinity: isObject(Infinity),
			booleanTrue: isObject(true),
			booleanFalse: isObject(false),
			zero: isObject(0),
			zeroMinus: isObject(-0),
			longitudeSmall: isObject(-181),
			longitudeBig: isObject(181),
			array: isObject([]),
			object: isObject({})
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
			longitudeSmall: false,
			longitudeBig: false,
			array: false,
			object: true
		})
})
