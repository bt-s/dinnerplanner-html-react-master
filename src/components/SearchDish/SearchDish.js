import React from 'react';
//import PropTypes from 'prop-types';

import './SearchDish.scss';

class SearchDish extends React.Component {
  render() {
    return (
      <div className="search-bar col">
        <h2>Find a dish</h2>
        <div className="search-bar-container col">
          <input id="keywordInput" placeholder="Enter key word" />
          <select id="dishTypeSelect">
            <option value="">All</option>
          </select>
          <button
            type="submit"
            id="searchDishButton"
            className="btn btn-orange">
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchDish;
