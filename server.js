const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const robot = require('robotjs');
const request = require('request');
const creds = require('../credentials.js');
const bodyParser = require('body-parser')
const youtube = require('youtube-node');

const youtubeAPI = new youtube();
youtubeAPI.setKey(creds.YOUTUBE_KEY);

app.use(express.static('dist'));
app.use(express.static('client'));
app.use(bodyParser.json());

app.get('/api/search/', (req, res) => {
  youtubeAPI.search(req.query.q, 5, (e, result) => {
    res.send(result.items.map((item) => normalizeResult(item)));
  });
});

app.post('/api/play/', (req, res) => {
  youtubeAPI.getById(req.body.ytId, (e, result) => {
    app.locals.currentItem = normalizeResult(result.items[0], req.body.ytId);
    io.emit('currently-playing', app.locals.currentItem);
  });
});

app.get('/api/stop-playing/', (req, res) => io.emit('currently-playing', {}));

app.get('/api/currently-playing', (req, res) => res.send(app.locals.currentItem));

app.get('/stream/', (req, res) => res.sendFile(__dirname + '/client/stream.html'));

// Setup PiCAST Server
server.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Access at http://%s:%s', host, port);
});

function normalizeResult(item, id = null) {
  const ytId = id || item.id.videoId;
  return {
    ytId: ytId,
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${ytId}`
  };
}
