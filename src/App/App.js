import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { modelInstance } from '../data/DinnerModel'

import SelectDish from "../SelectDish/SelectDish";
import Welcome from '../Welcome/Welcome';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Dinner Planner",
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.title}</h1>

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>
          <Route path="/search" render={() => <SelectDish model={modelInstance}/>}/>

        </header>
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string
};

export default App;
