import React from 'react';
import {Link} from 'react-router-dom';

import './Welcome.css';

class Welcome extends React.Component {
  render() {
    return (
      <div className="Welcome">
        <p>Welcome to the dinner planner React Startup code!</p>

        <Link to="/search">
          <button>Start planning</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
