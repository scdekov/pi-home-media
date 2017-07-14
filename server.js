var sys = require('sys');
var spawn = require('child_process').spawn;
var express = require('express');
var app = express();
var robot = require('robotjs');

app.get('/', function (req, res) {
        res.send('Welcome to PiCAST 3! In the URL, type what you want to do...');
});

var currentBrowserProc = null;

app.get('/yt-stream/:url', function (req, res) {
    if (currentBrowserProc) {
        currentBrowserProc.kill();
    }

    res.send('Streaming YouTube Video...');
    currentBrowserProc = spawn('chromium-browser', [`https://www.youtube.com/watch?v=${req.params.url}`]);
    setTimeout(function () {
        robot.keyTap('f');
    }, 5000);
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

console.log('EVERYTHING IS UP')
