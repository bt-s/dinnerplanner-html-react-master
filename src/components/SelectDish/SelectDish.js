import React from 'react';
import PropTypes from 'prop-types';

import SearchDish from '../SearchDish/SearchDish';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

import './SelectDish.scss';

class SelectDish extends React.Component {
  render() {
    return (
      <div className="select-dish col">
        <Sidebar model={this.props.model} />
        <div className="dish-search-container">
          <SearchDish />
          <Dishes />
        </div>
      </div>
    );
  }
}

SelectDish.propTypes = {
  model: PropTypes.object,
};

export default SelectDish;
