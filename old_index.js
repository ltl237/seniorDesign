var express = require('express');
var handlebars = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var db;

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || 5000);

// for BTOA
global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str).toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString();
  };
}
//

function getData(callback) {
    'use strict';
        
    const httpTransport = require('https');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'www.mysportsfeeds.com',
        port: '443',
        path: 'https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/scoreboard.json?fordate=20170327',
        method: 'GET',
        headers: {"Authorization":"Basic " + btoa('ltl237' + ":" + 'student12')}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
}


app.get('/', function(req, res){
    
    getData(function(error, statusCode, headers, body) {
        // console.log('ERROR:', error); 
        // console.log('STATUS:', statusCode);
        // console.log('HEADERS:', JSON.stringify(headers));
        console.log('BODY:', body);
        var data = body;
        var jsonData = JSON.parse(data);
        console.log(jsonData.scoreboard.gameScore[0].game.awayTeam.Abbreviation);
        // console.log(typeof(jsonData[0]));
        // console.log(typeof(body));
        // console.log(data[2]);
        res.render('home2');
    });

})


app.get('/teams', function(req,res){
	res.render('teams');
})