import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from '../Sidebar/Sidebar';

import './DinnerOverview.scss';

class DinnerOverview extends React.Component {
  render() {
    return (
      <div className="dinner-overview">
        <h2>This is the Dinner Overview screen</h2>

        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model}/>
				<Link to="/dinner-printout">
					<button id='printRecipeButton' className='btn btn-orange'>
						<span>Print Full Recipe</span>
					</button>
				</Link>
      </div>
    );
  }
}

DinnerOverview.propTypes = {
  model: PropTypes.object
}

export default DinnerOverview;
