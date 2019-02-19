import React from 'react';
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';

const TitleBar = props => {
  const numberOfPeople = props.model.getStoreData('numberOfPeople');
  return (
    <div className="title-bar">
      <h2>My Dinner: {numberOfPeople} people</h2>
      <Link to="/search" className="btn btn-orange btn-pointy">
        Back to edit dinner
      </Link>
    </div>
  );
};

TitleBar.propTypes = {
  model: PropTypes.object
};

export default TitleBar;
