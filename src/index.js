const format = require('./format')
const promiseFormat = require('./promiseFormat')
const postgresFormat = require('./postgresFormat')

const {
	stringFormat,
	integerFormat,
	floatFormat,
	booleanFormat
} = require('./formats')

module.exports = {
	format,
	promiseFormat,
	postgresFormat,
	stringFormat,
	integerFormat,
	floatFormat,
	booleanFormat
}
