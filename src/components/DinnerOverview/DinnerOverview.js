import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import Sidebar from '../Sidebar/Sidebar';

class DinnerOverview extends React.Component {
  render() {
    const buttonText = 'Print Full Recipe';
    const buttonId = 'printRecipeButton';

    return (
      <div className="dinner-overview col">
        <h2>This is the Dinner Overview screen</h2>

        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model} />
        <Link to="/dinner-printout">
          <Button id={buttonId} text={buttonText} />
        </Link>
      </div>
    );
  }
}

DinnerOverview.propTypes = {
  model: PropTypes.object,
};

export default DinnerOverview;
