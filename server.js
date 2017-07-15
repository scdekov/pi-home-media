const sys = require('sys');
const spawn = require('child_process').spawn;
const express = require('express');
const app = express();
const robot = require('robotjs');
const request = require('request');


let currentBrowserProc = null;
let youtubeKey = 'AIzaSyAph2AtB2-kc2-bftUJkjG8ZHwkuiirZC8';


app.use(express.static(__dirname));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});


app.get('/search/', (req, res) => {
    let url = `https://www.googleapis.com/youtube/v3/search?key=${youtubeKey}&part=snippet&q=${req.query.q}`;
    request(url, (e, r, body) => {
        res.send(body);
    });
});


app.get('/yt-stream/:url', (req, res) => {
    if (currentBrowserProc) {
        currentBrowserProc.kill();
    }

    currentBrowserProc = spawn('chromium-browser', [`https://www.youtube.com/watch?v=${req.params.url}`]);
    setTimeout(() => {
        robot.keyTap('f');
    }, 15000);
});


app.get('/kill/', (req, res) => {
    if (currentBrowserProc) {
        currentBrowserProc.kill();
    }
});


// Setup PiCAST Server
let srv = app.listen(3000, () => {
        let host = srv.address().address;
        let port = srv.address().port;

        console.log('Access at http://%s:%s', host, port);
});
