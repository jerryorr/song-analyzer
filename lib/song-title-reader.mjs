import sax from 'sax'
import { Readable } from 'node:stream'

/**
 * A Readable stream that parses a Discogs XML data dump and extracts
 * all the song titles. Can be piped to an output file or used 
 * immediately in the current process.
 */
export default class SongTitleReader extends Readable {
    #inTrack = false
    #inTitle = false
    #titleBuffer = []
    #doneReading = false

    constructor (xmlFileStream) {
        super({})
        let parser = sax.createStream(true, { strict: true })

        parser.on('opentag', node => {
            if (node.name === 'track') {
                this.#onOpenTrack()
            } else if (node.name === 'title') {
                this.#onOpenTitle()
            }
        })

        parser.on('text', text => {
            this.#onText(text)
        })

        parser.on('closetag', (tagName) => {
            if (tagName === 'track') {
                this.#onCloseTrack()
            } else if (tagName === 'title') {
                this.#onCloseTitle()
            }
        })

        parser.on('end', () => {
            this.#doneReading = true
        })

        xmlFileStream.pipe(parser)
    }

    #onOpenTrack () {
        this.#inTrack = true
    }

    #onCloseTrack () {
        this.#inTrack = false
    }

    #onOpenTitle () {
        // <title> could be in elements other than <track>, so check
        // that first
        if (this.#inTrack) {
            this.#inTitle = true
        }
    }

    #onCloseTitle () {
        if (this.#inTrack) {
            this.#inTitle = false
        }
    }

    #onText (text) {
        if (this.#inTrack && this.#inTitle) {
            this.#titleBuffer.push(text)
            this.#flush()
        }
    }

    #flush () {
        this.#titleBuffer.forEach(t => {
            this.push(t + '\n')
        })
        this.#titleBuffer = []

        if (this.#doneReading) {
            this.push(null)
        }
    }

    _read () {
        this.#flush()
    }
}
