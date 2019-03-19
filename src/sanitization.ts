interface IStringsSanitization {
	(input: string): string
}

export const trim: IStringsSanitization = input => input.trim()

export const trimLeft: IStringsSanitization = input => input.trimLeft()

export const trimRight: IStringsSanitization = input => input.trimRight()

export const toLowerCase: IStringsSanitization = input => input.toLowerCase()

export const toUpperCase: IStringsSanitization = input => input.toUpperCase()

export const truncate = (input: string, n: number): string => String(input).slice(0, n)

export const wordRegex = /(?:^|\s)\S/g
export const sentenceRegex = /(?:^|\.\s)\S/g

export enum capitalizeConst {
	words = 'words',
	sentences = 'sentences',
	first = 'first'
}

export const capitalize = (input: string, type: capitalizeConst): string => {
	if (type === capitalizeConst.words) {
		return input.replace(wordRegex, s => s.toUpperCase())
	} else if (type === capitalizeConst.sentences) {
		return input.replace(sentenceRegex, s => s.toUpperCase())
	} else if (type === capitalizeConst.first) {
		return input[0].toUpperCase() + input.slice(1)
	}

	return input
}
