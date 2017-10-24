const test = require('tape')
const schema = require('tape-schema')

const {
	graphql,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLFloat,
	GraphQLSchema,
	GraphQLList,
	GraphQLObjectType
} = require('graphql')

const {
	promiseFormat,
	stringFormat,
	integerFormat,
	floatFormat,
	booleanFormat
} = require('../src')

const formatTest = promiseFormat({
	string: stringFormat(),
	integer: integerFormat({naturalNumber: true}),
	float: floatFormat(),
	boolean: booleanFormat(),
	list: [stringFormat()]
})

const InputType = new GraphQLObjectType({
	name: 'InputType',
	fields: {
		string: {type: GraphQLString},
		integer: {type: GraphQLInt},
		float: {type: GraphQLFloat},
		boolean: {type: GraphQLBoolean},
		list: {type: new GraphQLList(GraphQLString)}
	}
})

const graphQLSchema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'query',
		description: 'test query',
		fields: {
			input: {
				type: InputType,
				args: {
					string: {type: GraphQLString},
					integer: {type: GraphQLInt},
					float: {type: GraphQLFloat},
					boolean: {type: GraphQLBoolean},
					list: {type: new GraphQLList(GraphQLString)}
				},
				resolve: (parentValue, args) =>
					formatTest(args)
			}
		}
	})
})

const graphqlQuery = `
	query (
		$string: String,
		$integer: Int,
		$float: Float,
		$boolean: Boolean,
		$list: [String]
	) {
		input (
			string: $string,
			integer: $integer,
			float: $float,
			boolean: $boolean,
			list: $list
		) {
			string
			integer
			float
			boolean
			list
		}
	} 
`

const inputValid = {
	string: 'string',
	integer: 10,
	float: 10.1,
	boolean: true,
	list: ['list']
}

test('promiseFormat success', t => {
	graphql(graphQLSchema, graphqlQuery, null, null, inputValid)
		.then(({data: {input}}) => {
			schema.test(t, inputValid, input)
			t.end()
		})
		.catch(t.end)
})

const inputInvalid = {
	string: 'string',
	integer: -10,
	float: 10.1,
	boolean: true,
	list: ['list']
}


test('promiseFormat fail', t => {
	graphql(graphQLSchema, graphqlQuery, null, null, inputInvalid)
		.then(({errors}) => {
			schema.test(t, 'Format error. "integer" has invalid value "-10". Expected natural number, found "-10".', errors[0].message)
			t.end()
		})
		.catch(t.end)
})
