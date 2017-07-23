import React from 'react';
import _ from 'lodash';

export default class SearchForm extends React.Component {
  onQueryChange(e) {
    const query = this.input.value;
    this.props.search(query);
  }

  render() {
    const onQueryChange = _.debounce(this.onQueryChange.bind(this), 500);

    return (
      <form action="" method="" onSubmit={(e) => e.preventDefault()}>
        <div className="input-wrapper">
          <input type="search"
                 placeholder="Search"
                 id="search"
                 onChange={onQueryChange}
                 ref={(input) => { this.input = input; }} />
        </div>
      </form>
    )
  }
}
