import fs from 'fs'
import _ from 'lodash'
import minimist from 'minimist'

import countWords from './lib/count-words.mjs'

const args = minimist(process.argv.slice(2))

const inFile = args._[0]
const outFile = args.output

const formatter = new Intl.NumberFormat('en-US')

if (!inFile) {
	console.error('Input file is required')
	console.error('\nUsage:')
	console.error('\tnode analyze-titles.mjs ./titles.txt > ./results.md')
	console.error('\tnode analyze-titles.mjs --output ./results.md ./titles.txt')
	process.exit(1)
}

const titlesReadStream = fs.createReadStream(inFile)

const outStream = !!outFile
	? fs.createWriteStream(outFile)
	: process.stdout

function writeln (line) {
	if (line) {
		outStream.write(line)
	}
	outStream.write('\n')
}

let { wordCounts, titlesAnalyzed } = await countWords(titlesReadStream)

writeln('# Analysis of Discogs Song Title Data')
writeln()
writeln('Data provided by [Discogs](https://www.discogs.com/developers).')
writeln()
writeln('Total songs analyzed: ' + formatter.format(titlesAnalyzed))
writeln()

_(wordCounts)
	.toPairs()
	.sortBy(([word, count]) => {
		return count * -1
	})
	.slice(0, 1000)
	.forEach(([word, count], i) => {
		let num = i + 1
		let capWord = _.capitalize(word)
		writeln(` ${num}. ${capWord} (${formatter.format(count)})`)
	})
