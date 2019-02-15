import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from '../Sidebar/Sidebar';

class DinnerPrintout extends React.Component {
  render() {
    return (
      <div className="dinner-printout col">
        <h2>This is the Dinner Printout screen</h2>

        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model} />
      </div>
    );
  }
}

DinnerPrintout.propTypes = {
  model: PropTypes.object,
};

export default DinnerPrintout;
