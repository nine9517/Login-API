const dbConfig = require('../configuration/mongoDB');

module.exports = (mongoose)=>{
    mongoose.connect('mongodb://'+dbConfig.DB_USERNAME+':'+dbConfig.DB_PASSWORD+'@'+dbConfig.DB_HOST+':'+dbConfig.DB_PORT+'/'+dbConfig.DB_NAME, { useNewUrlParser: true });
};