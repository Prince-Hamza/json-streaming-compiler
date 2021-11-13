const request = require('request')
const compilerModel = require('./compiler')
const compiler = compilerModel.compiler
var stream = request.get(`https://api.itscope.com/2.0/products/exports/7c4de04c-bd2a-4c8c-890a-006b5c65e472`).auth('m135172', 'GXBlezJK0n-I55K4RV_f0vHIRrFq_YcTNh9Yz735LJs', false)
stream.on('error', (err) => console.log(`stream error : ${err}`))


stream.on('data', (chunk) => {

    let strStream = (chunk.toString())
    let lineStream = strStream.split('\n')
    lineStream.map((line) => compiler.parseLine(line , stream))

})
