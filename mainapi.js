const express = require('express');
const morgan = require('morgan');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 55555;
const mongoose = require('mongoose');

// mongoose.connect('mongodb://'+dbConfig.DB_USERNAME+':'+dbConfig.DB_PASSWORD+'@'+dbConfig.DB_HOST+':'+dbConfig.DB_PORT+'/'+dbConfig.DB_NAME, { useNewUrlParser: true });
require('./helpers/mongohelper')(mongoose);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

app.use('/api/users', require('./routes/users'));
app.get('/',(req,res)=>{
    res.status(200).send("Welcome to Login API");
});

 var server = http.listen(port, function() {
    console.log('Login-API Server is running on port '+port+' at '+new Date());
});


