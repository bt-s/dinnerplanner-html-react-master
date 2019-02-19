import React from 'react';
import PropTypes from 'prop-types';

import DishSearchBar from '../DishSearchBar/DishSearchBar';
import Sidebar from '../Sidebar/Sidebar';
import DishItems from '../DishItems/DishItems';

const SearchDishesScreen = props => (
  <div className="select-dish col">
    <Sidebar model={props.model} />
    <div className="dish-search-container">
      <DishSearchBar model={props.model} />
      <DishItems model={props.model} />
    </div>
  </div>
);

SearchDishesScreen.propTypes = {
  model: PropTypes.object
};

export default SearchDishesScreen;
