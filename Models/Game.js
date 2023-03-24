const mongoose = require('mongoose');

const GameSchema = {
    title: String,
    description: String,
    price: Number,
    qtd: Number,
    company: String,
    image: String
}

const Game = mongoose.model('Game', GameSchema);

module.exports = Game