const trim = input => input.trim()

const trimLeft = input => input.trimLeft()

const trimRight = input => input.trimRight()

const toLowerCase = input => input.toLowerCase()

const toUpperCase = input => input.toUpperCase()

const truncate = (input, n) => String(input).slice(0, n)

const wordRegex = /(?:^|\s)\S/g
const sentenceRegex = /(?:^|\.\s)\S/g

const capitalize = (input, type) => {
	if (type === 'words') {
		return input.replace(wordRegex, s => s.toUpperCase())
	} else if (type === 'sentences') {
		return input.replace(sentenceRegex, s => s.toUpperCase())
	} else if (type === 'first') {
		return input[0].toUpperCase() + input.slice(1)
	}
}

module.exports = {
	trim,
	trimLeft,
	trimRight,
	toLowerCase,
	toUpperCase,
	truncate,
	capitalize
}
