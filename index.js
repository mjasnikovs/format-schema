const {
	format,
	stringFormat,
	intFormat,
	floatFormat,
	booleanFormat,
	STRING,
	INTEGER,
	FLOAT,
	BOOLEAN
} = require('./src/format')

const graphqlFormat = require('./src/graphqlFormat')
const postgresFormat = require('./src/postgresFormat')

module.exports = {
	format,
	graphqlFormat,
	postgresFormat,
	stringFormat,
	intFormat,
	floatFormat,
	booleanFormat,
	STRING,
	INTEGER,
	FLOAT,
	BOOLEAN
}
