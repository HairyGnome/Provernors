// db init
const mongoose = require('mongoose').default;
mongoose.connect('mongodb://localhost/h2tfth');

module.exports = mongoose;