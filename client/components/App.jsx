import React from 'react';
import SearchForm from './SearchForm.jsx';
import Results from './Results.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []}
  }

  search(query) {
    if (!query) {
      this.setState({items: []});
    }

    $.get(`api/search/?q=${query}`).done((data) => {
      // TODO: move this logic into the API endpoint
      const items = JSON.parse(data)
                        .items
                        .filter((item) => item.id.videoId)
                        .map((item) => ({ytId: item.id.videoId, title: item.snippet.title}));

      this.setState({items: items});
    });
  }

  playVideo(ytId) {
    $.get(`api/yt-stream/${ytId}`);
  }

  render() {
    return (
      <div className="main">
        <SearchForm search={this.search.bind(this)}/>
        <Results items={this.state.items} playVideo={this.playVideo.bind(this)}/>
      </div>
    )
  }
}
