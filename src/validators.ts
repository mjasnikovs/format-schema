import {MAX_INT, MIN_INT} from './types'

export const isUndefined = (input: any): boolean =>
	typeof input === 'undefined'

// compatibility
export const notUndef = (input: any) => !isUndefined(input)

export const isEmpty = (input: any): boolean =>
	input === null || typeof input === 'undefined' || input === ''

// compatibility
export const notEmpty = (input: any) => !isEmpty(input)

// compatibility
export const notZero = (input: any) => input !== 0 && 1 / input !== -Infinity

export const isZero = (input: any): boolean => !notZero(input)

export const isEmail = (input: any): boolean =>
	typeof input === 'string' && (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).exec(input) !== null

export const isNaturalNumber = (input: any): boolean =>
	typeof input === 'number' && input % 1 === 0 && Number.isInteger(input) && input >= 0 && 1 / input !== -Infinity

export const isInteger = (input: any): boolean => {
	if (typeof input !== 'number' || Number(input) !== input) {
		return false
	}

	if (!Number.isInteger(input)) {
		return false
	}

	if (input > MAX_INT || input < MIN_INT) {
		return false
	}
	return true
}

export const isFloat = (input: any): boolean => {
	if (typeof input !== 'number' || Number(input) !== input) {
		return false
	}

	if (input > MAX_INT || input < MIN_INT) {
		return false
	}
	return true
}

export const isString = (input: any): boolean =>
	typeof input === 'string'

export const isBoolean = (input: any): boolean =>
	input === true || input === false

export const isObject = (input: any): boolean =>
	typeof input === 'object' && input !== null && !Array.isArray(input) && input === Object(input)

// Helpers
export const isLatitude = (input: any): boolean =>
	input >= -90 && input <= 90 && typeof input === 'number'

export const isLongitude = (input: any): boolean =>
	input >= -180 && input <= 180 && typeof input === 'number'

export const isMaxNumber = (input: number, n: number): boolean => input <= n

export const isMinNumber = (input: number, n: number): boolean => input >= n

export const isMaxString = (input: string, n: number): boolean => input.length <= n

export const isMinString = (input: string, n: number): boolean => input.length >= n

type Primitive = string | number | boolean

export const inEnum = (
	input: Primitive,
	array: Primitive[]
): boolean => array.indexOf(input) !== -1
