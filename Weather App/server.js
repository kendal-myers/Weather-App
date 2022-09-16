'use strict';
var path = require('path');
var express = require('express');

var app = express();

// read content from assets directory
var staticPath = path.join(__dirname, '/assets');
app.use(express.static(staticPath));

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('listening on ' + app.get('port'));
});