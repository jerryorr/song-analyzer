import fs from 'fs'
import minimist from 'minimist'
import SongTitleReader from './lib/song-title-reader.mjs'

const args = minimist(process.argv.slice(2))

const inFile = args._[0]
const outFile = args.output

if (!inFile) {
	console.error('Input file is required')
	console.error('\nUsage:')
	console.error('\tnode extract-titles.mjs discogs_dump.xml > ./titles.txt')
	console.error('\tnode extract-titles.mjs --output ./titles.txt discogs_dump.xml')
	process.exit(1)
}

const xmlStream = fs.createReadStream(inFile)

const titlesFile = !!outFile
	? fs.createWriteStream(outFile)
	: process.stdout

const titleReader = new SongTitleReader(xmlStream)
titleReader.pipe(titlesFile)
