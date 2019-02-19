import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import {modelInstance} from './data/DinnerModel';

import DinnerOverviewScreen from './components/DinnerOverview/DinnerOverviewScreen';
import DinnerPrintoutScreen from './components/DinnerPrintout/DinnerPrintoutScreen';
import DishDetailScreen from './components/DishDetail/DishDetailScreen';
import SearchDishesScreen from './components/SearchDishes/SearchDishesScreen';
import WelcomeScreen from './components/Welcome/WelcomeScreen';

import './styling/style.scss';

class App extends React.Component {
  componentDidMount() {
    window.addEventListener(
      'beforeunload',
      modelInstance.bindToSelf(modelInstance.storeData)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'beforeunload',
      modelInstance.bindToSelf(modelInstance.storeData)
    );
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1
            onClick={e => {
              window.location.assign('/');
            }}>
            {this.props.title}
          </h1>
        </header>

        <div className="page-container">
          <Switch>
            <Route exact path="/" render={() => <WelcomeScreen />} />
            <Route
              path="/dish/:id"
              render={() => <DishDetailScreen model={modelInstance} />}
            />
            <Route
              path="/search"
              render={() => <SearchDishesScreen model={modelInstance} />}
            />
            <Route
              path="/dinner-overview"
              render={() => <DinnerOverviewScreen model={modelInstance} />}
            />
            <Route
              path="/dinner-printout"
              render={() => <DinnerPrintoutScreen model={modelInstance} />}
            />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  title: PropTypes.string
};

ReactDOM.render(
  <BrowserRouter>
    <App title="Dinner Planner" />
  </BrowserRouter>,
  document.getElementById('root')
);
