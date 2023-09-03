const mongoose = require('mongoose').default;
const Schema = mongoose.Schema;

const Governor = mongoose.model('Governor', {
    name: {
        type: String
    },
    age: {
        type: Number
    },
    favouriteGladiator: {
        type: String
    },
    sandalSize: {
        type: Number
    }
});

module.exports = Governor;