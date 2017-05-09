var express = require('express');
var handlebars = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var path = require('path');
var axios = require('axios');
var btoa = require('btoa');

var app = express();
var db;

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || 5000);


var gameData;
app.get('/', function(req, res){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = yyyy+mm+dd;


    var instance = axios.create({
        baseURL: 'https://www.mysportsfeeds.com/api/feed/pull/nba/2017-playoff/scoreboard.json?fordate='+today,
        headers: {
            "Authorization": "Basic " + btoa("ltl237" + ":" + "student12")
        }, dataType: "json"
    });
    instance.get('').then(function(response){
        gameData = response.data.scoreboard.gameScore;
        res.render('home2', {gameData: gameData});
        // console.log(gameData);
    }).catch(function(err){
        console.log(err);
    });
});


app.get('/teams', function(req,res){
    var instance = axios.create({
        baseURL: 'https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/conference_team_standings.json?teamstats=W,L,PTS,PTSA',
        headers: {
            "Authorization": "Basic " + btoa("ltl237" + ":" + "student12")
        }, dataType: "json"
    });
    instance.get('').then(function(response){
        var easternData = response.data.conferenceteamstandings.conference[0].teamentry;
        var westernData = response.data.conferenceteamstandings.conference[1].teamentry;
        var eastWins = easternData[0].stats.Wins['#text'];
        // console.log(eastWins);
        var eastLosses = easternData[0].stats.Losses['#text'];


       

        res.render('teams', {easternData: easternData, westernData: westernData, eastWins: eastWins});
    }).catch(function(err){
        console.log(err);
    })

});

app.get('/video', function(req, res){
    
    res.render('video', {gameData: gameData});
})