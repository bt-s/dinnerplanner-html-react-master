import React from 'react';
import PropTypes from 'prop-types';

import {computeTotalPrice} from '../../Utils';

const SidebarSelectedDishes = props => {
  const noDishesSelectedText = <li>Please, add a dish to the menu.</li>;
  const totalPrice = computeTotalPrice(props.numberOfPeople, props.dishes);

  const dishList = props.dishes.map((dish, i) => (
    <li key={i}>
      <span> - {dish.title}</span>
      <span>{dish.pricePerServing}</span>
    </li>
  ));

  return (
    <React.Fragment>
      <div className="sidebar-sub-header">
        <span>Dish Name</span>
        <span>Cost</span>
      </div>

      <ul className="selected-dishes">
        {dishList.length !== 0 ? dishList : noDishesSelectedText}
      </ul>

      <div className="total-price">Total: {totalPrice} SEK</div>
    </React.Fragment>
  );
};

SidebarSelectedDishes.propTypes = {
  dishes: PropTypes.array
};

export default SidebarSelectedDishes;
