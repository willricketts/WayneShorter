var mongoUri = require('mongodb-uri');

var dbUser = process.env.db_user,
    dbPass = process.env.db_pass,
    dbHost = process.env.db_host,
    db = process.env.db;

var connString = 'mongodb://' + dbUser + ':' + dbPass + '@' + dbHost + '/' + db;

var dbUri = mongoUri.formatMongoose(connString);

module.exports = dbUri;
