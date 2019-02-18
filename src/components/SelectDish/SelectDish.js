import React from 'react';
import PropTypes from 'prop-types';

import SearchDish from '../SearchDish/SearchDish';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

const SelectDish = props => {
  return (
    <div className="select-dish col">
      <Sidebar model={props.model} />
      <div className="dish-search-container">
        <SearchDish />
        <Dishes model={props.model} />
      </div>
    </div>
  );
};

SelectDish.propTypes = {
  model: PropTypes.object,
};

export default SelectDish;
