const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const port = process.env.PORT || 55555;
const mongoose = require('mongoose');

require('./helpers/mongohelper')(mongoose);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', require('./routes/users'));
app.get('/',(req,res)=>{
    res.status(200).send("Welcome to Login API");
});

 var server = http.listen(port, function() {
    console.log('Login-API Server is running on port '+port+' at '+new Date());
});


