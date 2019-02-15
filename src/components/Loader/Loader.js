import React from 'react';
import PropTypes from 'prop-types';

import './Loader.scss';

const Loader = props => {
  return <div className={props.className} />;
};

Loader.defaultProps = {
  className: 'loader',
};

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
