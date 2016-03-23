/*eslint-env node */
/*globals server */
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
var express = require('express');


var app = express();


app.get('/', /* @callback */ function(req, res) {

    res.setHeader('Content-Type', 'text/plain');

    res.end('Vous êtes à l\'accueil');

});


app.listen(server_port, server_ip_address);

