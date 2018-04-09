# format-schema [![Build Status](https://travis-ci.org/mjasnikovs/format-schema.svg?branch=master)](https://travis-ci.org/mjasnikovs/format-schema)

Object input validation and sanitization for node.js

### Installation

```javascript
npm install --save format-schema
```

## API

```javascript
const {
    format,
    promiseFormat,
    stringFormat,
    integerFormat,
    floatFormat,
    booleanFormat
} = require('format-schema')

```

## Single value test

```javascript
// Define test before executing format test, this will ensure tests configuration validity.
// After initialization, format test can be reused.

const stringTest = stringFormat({capitalize: 'words'})

// Lazy example (don't use it in production envoirement)
// const result = stringFormat({capitalize: 'words'})('edgars')

module.exports = string => {
    const result = stringTest('edgars')

    if (result instanceof Error) {
        return new Error(result)
    }

    // Edgars
    return result
}
```

## Schema value test

```javascript
// Define test before executing format test, this will ensure tests configuration validity.
// After initialization, format test can be reused.

const formatTest = format({
    name: stringFormat({capitalize: 'words', min: 2, max: 20, trim: true, notEmpty: true}),
    age: integerFormat({min: 18, max: 99, notEmpty: true}),
    friends: [integerFormat({naturalNumber: true, notZero: true})]
})

// {
//  name: ' edgars ',
//  age: 19,
//  friends: [10, 11, 12]
// }

module.exports = inputs => {
    const result = formatTest(inputs)

    if (result instanceof) {
        return new Error(result)
    }

    // {
    //  name: 'Edgars',
    //  age: 19,
    //  friends: [10, 11, 12]
    // }
    return result
}

```

## Error handling

```javascript
// Format test will return result object or error object, use "instanceof Error"

const result = formatTest(inputs)

if (result instanceof) {
    return new Error(result)
}

```

## String format configuration

```javascript
const stringTest = stringFormat({capitalize: 'words'})

// sanitize
trim,           // trim string [boolean]
trimLeft,       // trim string from left side [boolean]
trimRight,      // trim string from right side [boolean]
toLowerCase,    // mutate string character to lower case [boolean]
toUpperCase,    // mutate string character to upper case [boolean]
truncate,       // truncate strings lenght to specific lenght [integer]
capitalize,     // capitalize string ['words', 'sentences', 'first']

// validate
notUndef,       // typeof undefined not allowed [boolean]
notEmpty,       // typeof undefined, null, ''(empty string) not allowed [boolean]
enum,           // An array of valid strings, example ['Cat', 'Dog', 'Apple'] [array:<string>]
min,            // requirement for minimum strings length [integer]
max,            // requirement for maximum strings length [integer]
email,          // regExp test for basic email format [boolean], use with ({trim: true, toLowerCase: true})
test            // manual regExp test, example (stringFormat({test: /aaa/}))
```

## Integer format configuration

```javascript
const integerTest = integerFormat({naturalNumber: true})

// validate
notUndef,       // typeof undefined not allowed [boolean]
notEmpty,       // typeof undefined, null, ''(empty string) not allowed [boolean]
notZero,        // 0 not allowed
naturalNumber,  // 0, 1, 2, etc... allowed
enum,           // An array of valid integer, example [1, 2, 3] [array:<integer>]
min,            // minimum value
max             // maximum value
```

## Float format configuration

```javascript
const floatTest = floatFormat({naturalNumber: 'words'})

// validate
notUndef,       // typeof undefined not allowed [boolean]
notEmpty,       // typeof undefined, null, ''(empty string) not allowed [boolean]
notZero,        // 0 not allowed
naturalNumber,  // 0, 1, 2, etc... allowed
enum,           // An array of valid floats, example [1.1, 2.1, 3.1] [array:<float>]
min,            // minimum value
max,            // maximum value
positive,       // positive float required
latitude,       // latitude required
longitude       // longitude required       
```

## Boolean format configuration

```javascript
const booleanTest = booleanFormat({notEmpty: true})

// validate
notUndef,       // typeof undefined not allowed [boolean]
notEmpty,       // typeof undefined, null, ''(empty string) not allowed [boolean]   
```
