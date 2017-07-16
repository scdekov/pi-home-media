const spawn = require('child_process').spawn;
const express = require('express');
const app = express();
const robot = require('robotjs');
const request = require('request');
const creds = require('../credentials.js');


let currentBrowserProc = null;
const YOUTUBE_KEY = creds.YOUTUBE_KEY;

app.use(express.static('dist'));
app.use(express.static('client'));

app.get('/api/search/', (req, res) => {
    let url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_KEY}&part=snippet&q=${req.query.q}`;
    request(url, (e, r, body) => res.send(body));
});


app.get('/api/yt-stream/:url', (req, res) => {
    if (currentBrowserProc) {
        currentBrowserProc.kill();
    }

    currentBrowserProc = spawn('chromium-browser', [`https://www.youtube.com/watch?v=${req.params.url}`]);
    setTimeout(() => robot.keyTap('f'), 15000);
});


app.get('/api/kill/', (req, res) => {
    if (currentBrowserProc) {
        currentBrowserProc.kill();
    }
});


// Setup PiCAST Server
const srv = app.listen(3000, () => {
        const host = srv.address().address;
        const port = srv.address().port;

        console.log('Access at http://%s:%s', host, port);
});
