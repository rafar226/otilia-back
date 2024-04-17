const mongoose = require('mongoose')

const embeddingModel = mongoose.Schema({
    model: String,
    input: String,
    encoding_format: String
});

module.exports = mongoose.model('Embedding', embeddingModel);