import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

import './SelectDish.scss';

class SelectDish extends React.Component {
  render() {
    return (
      <div className="SelectDish">
        <h2>This is the Select Dish screen</h2>

        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model}/>
        <Dishes/>
      </div>
    );
  }
}

SelectDish.propTypes = {
  model: PropTypes.object
}

export default SelectDish;
