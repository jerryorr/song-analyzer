import readline from 'readline'
import _ from 'lodash'

const trimRegex = /^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g

export default async function countWords (lineStream) {
	const wordCounts = {}
	let titlesAnalyzed = 0

	const rl = readline.createInterface({
	    input: lineStream,
	    crlfDelay: Infinity,
	})

	return new Promise(resolve => {
		rl.on('line', title => {
			getWords(title).forEach(word => {
				let count = wordCounts[word] ?? 0
				wordCounts[word] = count + 1
			})

			++titlesAnalyzed
		})

		rl.on('close', () => {
			resolve({ wordCounts, titlesAnalyzed })
		})
	})
}

function getWords (title) {
	return title.split(' ')
		.map(word => {
			return word.replace(trimRegex, '').toLowerCase()	
		})
		.filter(word => word.trim().length > 0)
}
