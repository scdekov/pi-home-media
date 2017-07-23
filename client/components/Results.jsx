import React from 'react';

export default class Results extends React.Component {
  renderItem(item, index) {
    const { playVideo } = this.props;

    return (
      <li key={index}>
        <a className="item"
           href=""
           onClick={(e) => { e.preventDefault(); playVideo(item) }}>

          {item.title}
        </a>
      </li>
    )
  }

  renderCurrentItem() {
    const { currentItem } = this.props;

    if(!currentItem.title) { return null }

    return (
      <div>
        <p className="item current">
          Playing: {currentItem.title}
        </p>
      </div>
    )
  }

  render() {
    return (
      <ul id="results">
        {this.renderCurrentItem()}
        {this.props.items.map((item, index) => this.renderItem(item, index))}
      </ul>
    )
  }
}
