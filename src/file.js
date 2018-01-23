const fs = require('fs')
const path = require('path')

let stream = fs.createWriteStream(path.join(__dirname, './files/news.txt'))
stream.once('open', (f) => {
    stream.write('This is just a test')
    stream.end()
})