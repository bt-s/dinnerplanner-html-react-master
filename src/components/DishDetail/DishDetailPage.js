import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from '../Sidebar/Sidebar';
import DishDetail from './DishDetail';

const DishDetailPage = props => (
  <div className="dish-detail-page">
    <Sidebar model={props.model} />
    <DishDetail model={props.model} />
  </div>
);

DishDetailPage.propTypes = {
  model: PropTypes.object
};

export default DishDetailPage;
