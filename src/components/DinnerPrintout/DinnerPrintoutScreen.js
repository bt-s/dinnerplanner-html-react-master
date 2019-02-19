import React from 'react';
import PropTypes from 'prop-types';

import TitleBar from '../TitleBar/TitleBar';

const DinnerPrintoutScreen = props => {
  let printList = props.model.getStoreData('selectedDishes').map((dish, i) => (
    <li className="printout-dish" key={i}>
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

DinnerPrintoutScreen.propTypes = {
  model: PropTypes.object
};

export default DinnerPrintoutScreen;
