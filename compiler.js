const fs = require('fs')
const pause = require('pause')
require('events').EventEmitter.defaultMaxListeners = 100000;

class streamingCompiler {

    constructor() {
        this.objectString = ""

        this.skipLine = false // used
        this.stopline = false // used
        this.countBracket = 0 // used
        this.once = false // used

        this.countOpeningBrackets = 0
        this.countClosingBrackets = 0

        this.equalBracketsReached = false
        this.loopLimit = 10;

        this.product = ""
        this.first = true
    }

    parseLine = (line, stream) => {

       if (!this.stopline) {
           console.log(`makePair`)
           this.makeKeyVauePair(line)
        }
    }


    makeKeyVauePair = (line) => {

        if (line.includes('puid') && !this.first) {
            console.log('product complete')
            this.product = this.product
            this.product = this.product.substring(0, this.product.lastIndexOf('}'))
            fs.appendFileSync('test.json', "{" + this.product + "}")
            this.product = ""
            this.first = true
            //this.stopline = true
        }

        if (!this.first) this.product += line

        if (line.includes('puid') && this.first) {
            console.log('found puid')
            this.product += line
            this.first = false
        }
 
    }




    findStarter = (line) => {

        if (line.includes('{') && this.countBracket == 1) {
            console.log(`parsing second Bracket`)
            this.objectString += line.substring(line.indexOf('{'), line.length)
            this.countOpeningBrackets += 1
            console.log(`object string :: ${this.objectString}`)
            this.countBracket++
            this.skipLine = true
        }

        if (line.includes('{') && this.countBracket == 0) {
            console.log(`skipping first Bracket`)
            this.skipLine = true
            this.countBracket++
        }
    }


    appendLines = (line) => {
        if (!this.skipLine && this.stopline == false) {
            this.objectString += line
            this.onOpeningBracket(line)
            this.onClosingBracket(line)
        }
    }

    onOpeningBracket = (line) => {
        console.log(`line :: ${line}`)
        let OpeningBracketsInLine = (line.match(/{/g) || []).length;
        console.log(`opening brackets in line :: ${OpeningBracketsInLine}`)
        this.countOpeningBrackets += OpeningBracketsInLine
        console.log(`total openng brackets :: ${this.countOpeningBrackets}`)
    }

    onClosingBracket = (line) => {

        let openingBrackets = (this.objectString.match(/{/g) || []).length;
        let closingBrackets = (this.objectString.match(/}/g) || []).length;


        console.log(`opening Brackets : ${openingBrackets}`)
        console.log(`closing Brackets : ${closingBrackets}`)

        if (openingBrackets == closingBrackets) {
            fs.appendFileSync('test.json', this.objectString)
            this.stopline = true
            console.log('done')
            this.loopLimit--
        }

        // if (line.includes('}') && this.areOpeningAndClosingBracesEqual(this.objectString)) {
        //     fs.appendFileSync('test.json', this.objectString)
        //     console.log('done')
        //     this.loopLimit--
        //     this.stopline = true
        //     if (this.loopLimit > 0) this.reinit()
        // }
    }

    reinit = () => {
        if (this.objectString.substring(0, this.objectString.length - 1) !== ',') this.objectString += ','
        this.skipLine = false // used
        this.stopline = false // used
        this.countBracket = 0 // used
        this.once = false // used
        this.equalBracketsReached = false
    }


    areOpeningAndClosingBracesEqual = (objectString) => {
        let openBracesCount = (objectString.match(/{/g) || []).length;
        let closingBracesCount = (objectString.match(/}/g) || []).length;
        console.log(`number of opening braces :: ${openBracesCount}`)
        console.log(`number of closing braces :: ${closingBracesCount}`)
        return openBracesCount == closingBracesCount
    }

    count = (char) => {
        var count = (temp.match(/{/g) || []).length;
    }

}

exports.compiler = new streamingCompiler()