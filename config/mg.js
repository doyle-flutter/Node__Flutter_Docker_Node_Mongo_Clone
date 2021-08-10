const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.25.4:27017/test',{ useUnifiedTopology: true, useNewUrlParser: true } )
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error("Mongo Connect Error"));

module.exports = mongoose;