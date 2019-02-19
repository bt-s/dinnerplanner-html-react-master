import React from 'react';
import {Link} from 'react-router-dom';

import Button from '../Button/Button';

class WelcomeScreen extends React.Component {
  render() {
    const welcomeText =
      'Welcome to the Dinner Planner React app written for KTH Royal ' +
      'Institute of Technology DH2642 course (Interaction Programming and ' +
      'the Dynamic Web). \n\n Authors: Yao, Ming and Bas Straathof. \n\n ' +
      'Thanks to Michel Tabari for providing the React Startup code.';

    return (
      <div className="welcome">
        <p>{welcomeText}</p>

        <Link to="/search">
          <Button text="Create dinner" />
        </Link>
      </div>
    );
  }
}

export default WelcomeScreen;
