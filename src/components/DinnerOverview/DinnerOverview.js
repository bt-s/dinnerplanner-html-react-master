import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {computeTotalPrice} from '../../Utils';

import Button from '../Button/Button';
import TitleBar from '../TitleBar/TitleBar';

class DinnerOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfPeople: this.props.model.getStoreData('numberOfPeople')
    };
  }

  render() {
    const dishes = this.props.model.getStoreData('selectedDishes');

    const dishItems = dishes.map((dish, i) => (
      <li key={i}>
        <img alt={dish.title} src={dish.image} />
        <h3>{dish.title}</h3>
        <span>{dish.pricePerServing} SEK</span>
      </li>
    ));

    const totalPrice = computeTotalPrice(this.state.numberOfPeople, dishes);

    return (
      <div className="dinner-overview col">
        <TitleBar model={this.props.model} />

        <div className="selected-dishes-overview">
          <ul>{dishItems}</ul>
        </div>

        <span>TOTAL: {totalPrice} SEK</span>
        <hr />

        <Link to="/dinner-printout">
          <Button text="Print full recipe" />
        </Link>
      </div>
    );
  }
}

DinnerOverview.propTypes = {
  model: PropTypes.object
};

export default DinnerOverview;
