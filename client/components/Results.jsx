import React from 'react';
import _ from 'lodash';

const MAX_TITLE_LENGTH = 50;

export default class Results extends React.Component {
  renderItem(item, index) {
    const { playVideo } = this.props;

    return (
      <div key={index}>
        <a className="item"
           href=""
           onClick={(e) => { e.preventDefault(); playVideo(item.ytId) }}>

          {this.formatTitle(item.title)}
        </a>
      </div>
    )
  }

  formatTitle(title) {
    return _.truncate(title, {length: MAX_TITLE_LENGTH});
  }

  render() {
    const { items } = this.props;

    return (
      <div id="results">
        {items.map((item, index) => this.renderItem(item, index))}
      </div>
    )
  }
}
