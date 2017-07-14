var sys = require('sys');
var spawn = require('child_process').spawn;
var express = require('express');
var app = express();
var robot = require('robotjs');
var request = require('request');


var currentBrowserProc = null;
var youtubeKey = 'AIzaSyAph2AtB2-kc2-bftUJkjG8ZHwkuiirZC8';


app.use(express.static(__dirname));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index');
});


app.get('/search/', function (req, res) {
    var searchQ = req.query.q;
    var url = 'https://www.googleapis.com/youtube/v3/search?key=' + youtubeKey + '&part=snippet&' + 'q=' + searchQ;
    request(url, function (e, r, body) {
        res.send(body);
    });
});


app.get('/yt-stream/:url', function (req, res) {
    if (currentBrowserProc) {
        currentBrowserProc.kill();
    }

    currentBrowserProc = spawn('chromium-browser', [`https://www.youtube.com/watch?v=${req.params.url}`]);
    setTimeout(function () {
        robot.keyTap('f');
    }, 15000);
});


app.get('/kill/', function (req, res) {
    if (currentBrowserProc) {
        currentBrowserProc.kill();
    }
});


// Setup PiCAST Server
var srv = app.listen(3000, function () {
        var host = srv.address().address;
        var port = srv.address().port;

        console.log('Access at http://%s:%s', host, port);
});
