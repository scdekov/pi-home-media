import React from 'react';
import SearchForm from './SearchForm.jsx';
import Results from './Results.jsx';
import io from 'socket.io-client';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [], currentItem: {}};

    io().on('currently-playing', data => {
      this.setState({currentItem: data});
    });
  }

  search(query) {
    if (!query) {
      this.setState({items: []});
    }

    $.get(`api/search/?q=${query}`).done(data => this.setState({items: data}));
  }

  playVideo(item) {
    $.post({
      url: `api/play/`,
      data: JSON.stringify({'ytId': item.ytId}),
      'contentType': 'application/json'
    })
  }

  render() {
    return (
      <section className="webdesigntuts-workshop">
        <SearchForm search={this.search.bind(this)}/>
        <Results currentItem={this.state.currentItem} items={this.state.items} playVideo={this.playVideo.bind(this)}/>
      </section>
    )
  }
}
