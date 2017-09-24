# format-schema [![Build Status](https://travis-ci.org/mjasnikovs/format-schema.svg?branch=master)](https://travis-ci.org/mjasnikovs/format-schema)

Object input validation and sanitization in node.js and grapqhl-js resolve function

### Installation

```javascript
npm install --save format-schema
```

## API

```javascript
const {
    format,
    graphqlFormat,
    stringFormat,
    intFormat,
    floatFormat,
    booleanFormat
} = require('format-schema')

```

## format(schema, input)
Validate and sanitize input object
returns sanitized object or error

#### format => valid
```javascript
const schema = {
    name: stringFormat({require: true, trim: true})
}

const object= {
    name: ' Joe '
}

// result {name: 'Joe'}
const result = format(schema, object)

```

#### format => invalid
```javascript
const schema = {
    name: stringFormat({require: true, trim: true})
}

const object= {}

// Error('Argument "name" cannot be undefined. Found: undefined')
const result = format(schema, object)

```

## graphqlFormat(schema, input)
Validate and sanitize input object
returns promise which can resolve with a sanitized object or reject with error

#### graphqlFormat => valid
```javascript
const schema = {
    name: stringFormat({require: true, trim: true})
}

const object= {
    name: ' Joe '
}

// result {name: 'Joe'}
resolve: (parentValue, args, context) =>
	graphqlFormat(schema, args)
		.then(({name}) => name)

```

#### graphqlFormat => invalid
```javascript
const schema = {
    name: stringFormat({require: true, trim: true})
}

const object= {}

// GraphQLError ('Argument "name" cannot be undefined. Found: undefined')
resolve: (parentValue, args, context) =>
	graphqlFormat(schema, args)
		.then(({name}) => name)

```

## stringFormat
define string format in schema object

```javascript
const schema = {
	name: stringFormat({trim: true})
}

```

#### stringFormat options
```javascript
const string = stringFormat({
	/* sanitize */
	// trim string
	trim: [boolean],
	// trim string from left side
	trimLeft: [boolean],
	// trim string from right side
	trimRight: [boolean],
	// mutate string character to lower case
	toLowerCase: [boolean],
	// mutate string character to upper case
	toUpperCase: [boolean],
	// trnucate strings lenght to specific lenght
	truncate: [integer],
	// capitalize string:
	//* 'words': every words
	//* 'sentences': every sentences
	//* 'first': first character in string
	capitalize: ['words', 'sentences', 'first']
	// regExp test for basic email format
	// advised to use with {trim = true, toLowerCase = true}
	// /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	email: [boolean],
	/* validate */
	// not "" or [null] or [undefined]
	notEmpty: [boolean],
	// requirement for minimum strings length
	min: [integer],
	// requirement for maximum strings lenght
	max: [integer],
	// value is required
	enum: [array:<string>]
	// list of valid string values, empty value "" is allowed. Use notEmpty to block this.
	require: [boolean]
})

```

## intFormat
define intiger format in schema object

```javascript
const schema = {
	age: intFormat({min: 21})
}

```

#### intFormat options
```javascript
const int = stringFormat({
	/* validate */
	// 0 or positive integer
	naturalNumber: [boolean],
	// not 0 or -0
	notZero: [boolean],
	// minimum value
	min: [integer],
	// maximum value
	max: [integer],
	// value is required
	require: [boolean]
})

```

## floatFormat
define float format in schema object

```javascript
const schema = {
	pie: floatFormat({max: 3.14159, min: 3.14159})
}

```

#### floatFormat options
```javascript
const float = floatFormat({
	/* validate */
	// positive float, > 0
	positive: [boolean],
	// not 0 or -0
	notZero: [boolean],
	// minimum value
	min: [integer],
	// maximum value
	max: [integer],
	// value is required
	require: [boolean],
	// value is latitude
	latitude: [boolean],
	// value is longitude
	longitude: [boolean]
})
```

## booleanFormat
define boolean format in schema object

```javascript
const schema = {
	agrre: booleanFormat({require: true})
}

```

#### booleanFormat options

```javascript
const boolean = booleanFormat({
	/* validate */
	// value is required
	require: [boolean]
})
