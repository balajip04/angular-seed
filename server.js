/**
 * Created by balaajiparthasarathy on 3/16/17.
 */

// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
console.log('Express server');
// MongoDB

// mongoose.connection.on('error', function(){});

// Express
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./api'));

// Start server
var port =  8000 ,
    ip="127.0.0.1";
app.listen(port, ip, function() {
    console.log('Express server listening on %d', port);
});
