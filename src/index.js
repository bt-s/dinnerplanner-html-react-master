import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import {modelInstance} from './data/DinnerModel';

import DinnerOverview from './components/DinnerOverview/DinnerOverview';
import DinnerPrintout from './components/DinnerPrintout/DinnerPrintout';
import SelectDish from './components/SelectDish/SelectDish';
import Welcome from './components/Welcome/Welcome';
import DishDetail from './components/DishDetail/DishDetail';

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
          <h1>{this.props.title}</h1>
        </header>

        <div className="page-container">
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route
              path="/dish/:id"
              render={() => <DishDetail model={modelInstance} />}
            />
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
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  title: PropTypes.string
};

const title = 'Dinner Planner';

ReactDOM.render(
  <BrowserRouter>
    <App title={title} />
  </BrowserRouter>,
  document.getElementById('root')
);
