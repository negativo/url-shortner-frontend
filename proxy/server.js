var express = require('express');
var url = require('url');
var app = express();
var querystring = require('querystring');
var bodyParser = require('body-parser');
var https = require('https');
var Q = require('Q');
var Short = require('./Short.js')(querystring, https, Q);

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};

app.use(allowCrossDomain);

app.get('/:shortcode',getShortcode);
app.get('/:shortcode/stats',getShortcodeStats);
app.post('/shorten',shorten);

app.listen(3000, function () {

    console.log('Short proxy on port 3000!');

});



function getShortcode (req, res) {

    var shortcode = req.params.shortcode;

    Short
        .getUrl(shortcode)
        .then(function (response) {

            res.send(response);

        })
        .catch(function (err) {

            console.log(err);
            res.send(err);

        });

}


function getShortcodeStats (req, res) {

    var shortcode = req.params.shortcode;

    Short
        .getStats(shortcode)
        .then(function (response) {

            res.send(response);

        })
        .catch(function (err) {

            console.log(err);

        });
}



function shorten (req, res) {
    
    var url = req.body.url;
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var enabled = url.match(regex);
    if(enabled) {
        Short
            .shorten(req.body)
            .then(function (response) {

                var response = JSON.parse(response.body);
                res.send(response);

            })
            .catch(function (err) {

                console.log(err);

            });
    }else{
        res.status(500).send({ error: 'Our monkeys cannot recognize this url!' });
    }

}



