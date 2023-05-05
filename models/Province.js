const mongoose = require('mongoose').default;
const Schema = mongoose.Schema;

const Province = mongoose.model('Province', {
    name: {
        type: String
    },
    governor: {
        type: String
    },
    _governorId: {
        type: Schema.Types.ObjectId,
        ref: 'Governor'
    },
    leftHanded: {
        type: Number
    },
    wineProduced: {
        type: Number
    }
});

module.exports = Province;