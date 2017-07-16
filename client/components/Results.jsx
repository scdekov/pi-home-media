import React from 'react';

export default class Results extends React.Component {
  renderItem(item, index) {
    const { playVideo } = this.props;

    return (
      <li key={index}>
        <a className="item"
           href=""
           onClick={(e) => { e.preventDefault(); playVideo(item.ytId) }}>

          {item.title}
        </a>
      </li>
    )
  }

  render() {
    const { items } = this.props;

    return (
      <ul id="results">
        {items.map((item, index) => this.renderItem(item, index))}
      </ul>
    )
  }
}
