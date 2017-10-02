const spawn = require('child_process').spawn;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const request = require('request');
const creds = require('./credentials.js');
const bodyParser = require('body-parser')
const youtube = require('youtube-node');

let currentBrowserProc = null;

const youtubeAPI = new youtube();
youtubeAPI.setKey(creds.YOUTUBE_KEY);

app.use(express.static('dist'));
app.use(express.static('client'));
app.use(bodyParser.json());

app.get('/api/search/', (req, res) => {
    youtubeAPI.search(req.query.q, 5, (e, result) => {
        const normalizedResults = result.items.map((item) => normalizeResult(item))
        res.send(normalizedResults);
    });
});

app.post('/api/play/', (req, res) => {
    if (currentBrowserProc) {
        currentBrowserProc.kill();
    }

    currentBrowserProc = spawn('chromium-browser', [`https://www.youtube.com/watch?v=${req.body.ytId}`]);
    setTimeout(() => robot.keyTap('f'), 15000);

    youtubeAPI.getById(req.body.ytId, (e, result) => {
        app.locals.currentItem = normalizeResult(result.items[0], req.body.ytId);
        io.emit('currently-playing', app.locals.currentItem);
    });
});

app.get('/api/kill/', (req, res) => {
    if (currentBrowserProc) {
        currentBrowserProc.kill();
    }

    io.emit('currently-playing', {});
});

// Setup PiCAST Server
server.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Access at http://%s:%s', host, port);
});


function normalizeResult(item, id = null) {
    return {
        ytId: id || item.id.videoId,
        title: item.snippet.title
    };
}
