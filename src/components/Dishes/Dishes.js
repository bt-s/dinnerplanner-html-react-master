import React from 'react';

import {modelInstance} from '../../data/DinnerModel';

import Loader from '../Loader/Loader';

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
          baseUri: dishes.baseUri,
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
    const baseUri = this.state.baseUri;

    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <Loader />;
        break;
      case 'LOADED':
        dishesList = this.state.dishes.map(dish => (
          <a key={dish.id} href="/">
            <img src={baseUri + dish.image} alt={dish.title} />
            <h3>{dish.title}</h3>
          </a>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="dishes col">
        <h3>Dishes</h3>
        <div className="dish-items-container">{dishesList}</div>
      </div>
    );
  }
}

export default Dishes;
