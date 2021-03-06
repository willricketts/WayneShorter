var mongoUri = require('mongodb-uri');

var dbUser = process.env.db_user || '',
    dbPass = process.env.db_pass || '',
    dbHost = process.env.db_host || 'localhost',
    db = process.env.db || 'wayneshorter',
    connString;

if(dbUser && dbPass) {
  connString = 'mongodb://' + dbUser + dbPass + dbHost + '/' + db;
}
else {
  connString = 'mongodb://' + dbHost + '/' + db;
}

var dbUri = mongoUri.formatMongoose(connString);

module.exports = dbUri;
