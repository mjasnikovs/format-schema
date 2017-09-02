const test = require('tape')
const schema = require('tape-schema')

const {
	graphql,
	GraphQLSchema,
	GraphQLFloat,
	GraphQLObjectType
} = require('graphql')

const {
	graphqlFormat,
	floatFormat
} = require('../index')

const generateSchema = (config = {}) =>
	new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'query',
			description: 'test query',
			fields: {
				input: {
					type: GraphQLFloat,
					description: 'Provides test float',
					args: {
						float: {
							type: GraphQLFloat
						}
					},
					resolve: (parentValue, args) =>
						graphqlFormat(config, args)
							.then(({float}) => float)
				}
			}
		})
	})

const generateGraphql = (config, float = null) =>
	graphql(generateSchema(config), `{input(float:${JSON.stringify(float)})}`)

test('graphql float not Zero', t => {
	const float = 1

	generateGraphql({float: floatFormat({notZero: true})}, float)
		.then(result => {
			schema.test(t, {
				data: {input: float},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql float notZero error', t => {
	const float = 0

	generateGraphql({float: floatFormat({notZero: true})}, float)
		.then(result => {
			schema.test(t, {
				data: {input: null},
				errors: [
					{
						message: 'Argument "float" has invalid value "0". Expected non-zero, found: 0',
						locations: [{line: schema.naturalNumber, column: schema.naturalNumber}],
						path: ['input']
					}
				]
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql float min', t => {
	const float = 10

	generateGraphql({float: floatFormat({min: 10})}, float)
		.then(result => {
			schema.test(t, {
				data: {input: float},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql float min error', t => {
	const float = 9

	generateGraphql({float: floatFormat({min: 10})}, float)
		.then(result => {
			schema.test(t, {
				data: {input: null},
				errors: [
					{
						message: 'Argument "float" has invalid value "9". Expected minimum value of 10, found: 9',
						locations: [{line: schema.naturalNumber, column: schema.naturalNumber}],
						path: ['input']
					}
				]
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql float max', t => {
	const float = 10

	generateGraphql({float: floatFormat({max: 10})}, float)
		.then(result => {
			schema.test(t, {
				data: {input: float},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql float max error', t => {
	const float = 11

	generateGraphql({float: floatFormat({max: 10})}, float)
		.then(result => {
			schema.test(t, {
				data: {input: null},
				errors: [
					{
						message: 'Argument "float" has invalid value "11". Expected maximum value of 10, found: 11',
						locations: [{line: schema.naturalNumber, column: schema.naturalNumber}],
						path: ['input']
					}
				]
			}, result)
			t.end()
		})
		.catch(t.end)
})
