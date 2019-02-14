import React from 'react';
import PropTypes from 'prop-types';

import SearchDish from '../SearchDish/SearchDish';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

import './SelectDish.scss';

class SelectDish extends React.Component {
  render() {
    return (
      <div className="select-dish">
        <Sidebar model={this.props.model} />
        <SearchDish />
        <Dishes />
      </div>
    );
  }
}

SelectDish.propTypes = {
  model: PropTypes.object,
};

export default SelectDish;
