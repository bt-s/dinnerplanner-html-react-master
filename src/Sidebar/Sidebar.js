import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import './Sidebar.scss';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
    };
  }

  componentDidMount() {
    this.props.model.addObserver(this);
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
    });
  }

  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(+e.target.value);
  };

  render() {
    return (
      <div className="Sidebar">
        <h3>This is the sidebar</h3>
        <p>
          People:{' '}
          <input
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
          <br />
          Total number of guests: {this.state.numberOfGuests}
        </p>
        <Link to="/dinner-overview">
          <button>Confirm Dinner</button>
        </Link>
      </div>
    );
  }
}

Sidebar.propTypes = {
  model: PropTypes.object
};

export default Sidebar;
