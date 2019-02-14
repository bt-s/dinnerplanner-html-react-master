import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import {modelInstance} from '../../data/DinnerModel';

import DinnerOverview from '../DinnerOverview/DinnerOverview';
import DinnerPrintout from '../DinnerPrintout/DinnerPrintout';
import SelectDish from '../SelectDish/SelectDish';
import Welcome from '../Welcome/Welcome';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Dinner Planner',
    };
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>{this.state.title}</h1>

          {/* We rended different component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route
            path="/search"
            render={() => <SelectDish model={modelInstance} />}
          />
          <Route
            path="/dinner-overview"
            render={() => <DinnerOverview model={modelInstance} />}
          />
          <Route
            path="/dinner-printout"
            render={() => <DinnerPrintout model={modelInstance} />}
          />
        </header>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
};

export default App;
