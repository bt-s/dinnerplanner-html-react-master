import React from 'react';
import PropTypes from 'prop-types';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Button from '../Button/Button';

const SidebarHeader = props => (
  <div className="sidebar-header">
    <h2>My Dinner</h2>
    <Button
      className=""
      id="menuButton"
      onClick={props.onMenuToggle}
      text={
        <React.Fragment>
          <FontAwesomeIcon icon={props.barsIcon} />
          <FontAwesomeIcon icon={props.timesIcon} />
        </React.Fragment>
      }
    />
  </div>
);

SidebarHeader.propTypes = {
  onMenuToggle: PropTypes.func,
  barsIcon: PropTypes.object,
  timesIcon: PropTypes.object
};

export default SidebarHeader;
