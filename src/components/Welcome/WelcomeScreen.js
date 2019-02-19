import React from 'react';
import {Link} from 'react-router-dom';

import Button from '../Button/Button';

class WelcomeScreen extends React.Component {
  render() {
    const buttonText = 'Create dinner';

    return (
      <div className="welcome">
        <p>Welcome to the dinner planner React Startup code!</p>

        <Link to="/search">
          <Button text={buttonText} />
        </Link>
      </div>
    );
  }
}

export default WelcomeScreen;
