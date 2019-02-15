import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = props => {
  return (
    <button id={props.id} className={props.className}>
      {props.text}
    </button>
  );
};

Button.defaultProps = {
  className: 'btn btn-orange',
  text: '',
};

Button.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  text: PropTypes.string,
};

export default Button;
