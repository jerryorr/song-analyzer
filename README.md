# song-analyzer

Scripts to analyze Discogs data for the most commonly used words in song titles. You can run these yourself, or see [my own summary](https://sundry.jerryorr.com/2024/02/22/song-title-analysis) of the results.

_This application uses Discogs’ API but is not affiliated with, sponsored or endorsed by Discogs. ‘Discogs’ is a trademark of Zink Media, LLC._

# Usage

 1. Download and unzip the XML data dump from [the Discogs developer site](https://www.discogs.com/developers).
 2. Download this repo:
```
git clone https://github.com/jerryorr/song-analyzer.git
``` 
 3. [Install Node.js](https://nodejs.org/en/download/) (if necessary) and from the `song-analyzer` directory, run `npm install`
 4. Run the title extractor (this can take quite some time):
```
node extract-titles.mjs [discogs XML file] > ./titles.txt
``` 
 5. Run the title analyzer on the titles file:
```
node analyze-titles.mjs ./titles.txt > ./results.md
```

The results of the analysis are in `results.md`

# License

[The MIT License](https://mit-license.org)

Copyright © 2024 Jeremiah Orr

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
