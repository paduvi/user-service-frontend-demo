/**
 * Created by chotoxautinh on 1/1/17.
 */
process.env.NODE_ENV = require('./config').env || 'development';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

var compression = require('compression');

app.use(compression());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(express.static('dist'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var server = app.listen(8000, function () {
    var port = server.address().port;
    console.log("Started server at port", port);
});