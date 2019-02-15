import React from 'react';
import {Link} from 'react-router-dom';

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
          <Link to={'/dish/' + kebabCase(dish.title)} key={dish.id} href="/">
            <img src={baseUri + dish.image} alt={dish.title} />
            <h3>{dish.title}</h3>
          </Link>
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

const kebabCase = string =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

export default Dishes;
