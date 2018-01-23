const mongoose = require('mongoose')

const HackNews = new mongoose.Schema({
    title: String,
    url: String
})

module.exports = mongoose.model('HackNews', HackNews)