import React from 'react';
import PropTypes from 'prop-types';

import TitleBar from '../TitleBar/TitleBar';

const DinnerPrintout = props => {
  let printList = props.model.getStoreData('selectedDishes').map(dish => (
    <li class="printout-dish">
      <img src={dish.image} alt="" />
      <section>
        <h2>{dish.title}</h2>
        <p>{dish.instructions}</p>
      </section>
      <section>
        <h3>Preparation</h3>
        <p>{dish.instructions}</p>
      </section>
    </li>
  ));

  return (
    <div>
      <TitleBar model={props.model} />
      <div className="dinner-printout col">
        <ul className="printout-dishes">{printList}</ul>
      </div>
    </div>
  );
};

DinnerPrintout.propTypes = {
  model: PropTypes.object
};

export default DinnerPrintout;
