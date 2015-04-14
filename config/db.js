var mongoUri = require('mongodb-uri');

var dbUser = process.env.db_user,
    dbPass = process.env.db_pass;

var connString = 'mongodb://' + dbUser + ':' + dbPass + '@ds061741.mongolab.com:61741/wayneshorter';

var dbUri = mongoUri.formatMongoose(connString);

module.exports = dbUri;
