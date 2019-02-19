import React from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';

const DishDescription = props => {
  const viewingDish = props.model.getViewingDish();

  return (
    <div className="dish-description">
      <h2>{viewingDish.title}</h2>
      <img src={viewingDish.image} alt={viewingDish.title} />
      <p>{viewingDish.instructions}</p>
      <Link
        to="/search"
        id="backToSearchButton"
        className="btn btn-orange btn-pointy">
        Back to search
      </Link>
    </div>
  );
};

DishDescription.propTypes = {
  model: PropTypes.object
};

export default DishDescription;
