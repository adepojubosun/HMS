var mongoose = require('mongoose');
var credentials = require('./credentials');

var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
mongoose.connect(credentials.mongoUrl, opts);

module.exports = mongoose;