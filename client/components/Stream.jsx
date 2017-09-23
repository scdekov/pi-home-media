import React from 'react';
import ReactPlayer from 'react-player'
import io from 'socket.io-client';

export default class Stream extends React.Component {
  constructor(props) {
    super(props)
    this.state = {url: '', playing: false}

    $.get('/api/currently-playing')
      .then(this.runUrl.bind(this))

    io().on('currently-playing', this.runUrl.bind(this))
  }

  runUrl(res) {
    this.setState({url: res && res.url, playing: !!res});
  }

  render() {
    return <ReactPlayer
      onReady={this.requestFullScreen}
      url={this.state.url}
      playing={this.state.playing}
    />
  }
}
