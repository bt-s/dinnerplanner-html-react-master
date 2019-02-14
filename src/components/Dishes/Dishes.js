import React from 'react';

import {modelInstance} from '../../data/DinnerModel';

import './Dishes.scss';

class Dishes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'INITIAL',
    };
  }

  componentDidMount = () => {
    modelInstance
      .getAllDishes()
      .then(dishes => {
        this.setState({
          status: 'LOADED',
          dishes: dishes.results,
        });
      })
      .catch(() => {
        this.setState({
          status: 'ERROR',
        });
      });
  };

  render() {
    let dishesList = null;

    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <em>Loading...</em>;
        break;
      case 'LOADED':
        dishesList = this.state.dishes.map(dish => (
          <li key={dish.id}>{dish.title}</li>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="dishes">
        <h3>Dishes</h3>
        <ul>{dishesList}</ul>
      </div>
    );
  }
}

export default Dishes;
