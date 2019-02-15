import React from 'react';
import {Link} from 'react-router-dom';

import {modelInstance} from '../../data/DinnerModel';

import Button from '../Button/Button';
import Loader from '../Loader/Loader';

class Dishes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
      isToggleOn: true,
      status: 'INITIAL',
      itemsPerPage: 10,
      offset: 0,
    };
  }

  callAPI = params => {
    modelInstance
      .getAllDishes(params)
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

  componentDidMount() {
    this.setState({isMounted: !this.state.isMounted});
    this.callAPI('');
  }

  handlePaginationButtons = e => {
    if (this.state.isMounted !== true) {
      return;
    }

    e.preventDefault();

    let stepSize;
    if (e.target.id === 'next') {
      stepSize = this.state.itemsPerPage;
    } else if (e.target.id === 'previous') {
      stepSize = -1 * this.state.itemsPerPage;
    }

    this.setState(
      state => ({
        offset: state.offset + stepSize,
        status: 'INITIAL',
      }),
      () => this.callAPI('offset=' + this.state.offset),
    );
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

    const paginationButtons =
      this.state.offset === 0 ? (
        <Button
          className="next-button btn btn-orange"
          id="next"
          onClick={this.handlePaginationButtons}
          text={'Show next ' + this.state.itemsPerPage + ' dishes'}
        />
      ) : (
        <React.Fragment>
          <Button
            className="previous-button btn btn-orange"
            id="previous"
            onClick={this.handlePaginationButtons}
            text={'Show previous ' + this.state.itemsPerPage + ' dishes'}
          />

          <Button
            className="next-button btn btn-orange"
            id="next"
            onClick={this.handlePaginationButtons}
            text={'Show next ' + this.state.itemsPerPage + ' dishes'}
          />
        </React.Fragment>
      );

    return (
      <div className="dishes col">
        <div className="dish-items-container">{dishesList}</div>

        {paginationButtons}
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
