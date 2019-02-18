import React from 'react';
import PropTypes from 'prop-types';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Button from '../Button/Button';

function SidebarPeople(props) {
  return (
    <div className="people-container">
      <span>People</span>
      <div className="people-selector-button">
        <span>{props.numberOfPeople}</span>
        <div className="up-down-buttons">
          <Button
            className="btn"
            id="plusPerson"
            onClick={props.onChangeNumberOfPeople}
            text={<FontAwesomeIcon icon={props.arrowUp} />}
          />
          <Button
            className="btn"
            id="minusPerson"
            onClick={props.onChangeNumberOfPeople}
            text={<FontAwesomeIcon icon={props.arrowDown} />}
          />
        </div>
      </div>
    </div>
  );
}

SidebarPeople.propTypes = {
  numberOfPeople: PropTypes.number,
  onChangeNumberOfPeople: PropTypes.func,
  arrowUp: PropTypes.object,
  arrowDown: PropTypes.object,
};

export default SidebarPeople;
