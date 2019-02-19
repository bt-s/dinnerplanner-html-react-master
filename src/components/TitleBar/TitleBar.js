import React from 'react';
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';

import Button from '../Button/Button';

// function TitleBar(props) {
class TitleBar extends React.Component {
  render() {
    const buttonText = 'Back to Edit Dinner';
    return (
      <div className="title-bar">
        <h2>
          My Dinner:
          <span>{this.props.model.getStoreData('numberOfPeople')}</span>
          people
        </h2>
        <Link to="/search" className="btn btn-orange btn-pointy">
          {buttonText}
        </Link>
      </div>
    );
  }
}

TitleBar.propTypes = {
  model: PropTypes.object,
};

export default TitleBar;
