import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'};
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    }
  }

  handleSortByChange(event) {
    this.setState({
      sortBy: event.target.getAttribute('id')
    });
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      // sortByOption is here e.g. 'Best Match'
      // this.sortByOptions[sortByOption] is then the value at
      // position in array *with name* 'Best Match' (reference by name)
      // sortByOptionValue gets value e.g. 'best_match'

      // see https://www.reactenlightenment.com/react-jsx/5.7.html for supported React attributes
      // see https://www.w3schools.com/tags/tag_li.asp for supported HTML attributes

      // By now I found out that
      // 1. the key-attribite
      // a. needs to be there because of 'warning' 'each element in an array needs to heve a key prop' but
      // b. cannot be used for this (or nobody knows how)
      // 2. I can choose from other valid HTML <li> element attributes (as long as they are not 'value' or 'type' (see w3schools.com/tags/tag_li.asp)
      // 3. as long as they are supported by React, see reactenlightenment.com/react-jsx/5.7.html
      // Now, using 'id' as attribute, event.target.getAttribute('id') works in the eventHandler
      return (
        <li
          className={this.getSortByClass(sortByOptionValue)}
          onClick={this.handleSortByChange}
          key={sortByOptionValue}
          id={sortByOptionValue}>
          {sortByOption}
        </li>);
    });
  }

  render() {
    return (
      <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>
          {this.renderSortByOptions()}
        </ul>
      </div>
      <div className="SearchBar-fields">
        <input
          onChange={this.handleTermChange}
          placeholder="Search Businesses" />
        <input
          onChange={this.handleLocationChange}
          placeholder="Where?" />
      </div>
      <div className="SearchBar-submit">
        <a onClick={this.handleSearch}>Lets Go</a>
      </div>
    </div>
    );
  }
}

export {SearchBar};
