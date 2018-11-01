const dbConfig = require('../configuration/mongoDB');
const mongoose = require('mongoose');
module.exports = ()=>{
    mongoose.connect('mongodb://'+dbConfig.DB_USERNAME+':'+dbConfig.DB_PASSWORD+'@'+dbConfig.DB_HOST+':'+dbConfig.DB_PORT+'/'+dbConfig.DB_NAME, { useNewUrlParser: true });
};