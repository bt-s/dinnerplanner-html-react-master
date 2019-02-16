import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  return (
    <button
      className={props.className}
      id={props.id}
      onClick={props.onClick}
      type={props.type}>
      {props.text}
    </button>
  );
};

Button.defaultProps = {
  className: 'btn btn-orange',
  text: '',
  type: 'button',
};

Button.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
};

export default Button;
