import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {modelInstance} from '../../data/DinnerModel';

import {kebabCase} from '../../Utils';

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
      offset: modelInstance.getStoreData('offset'),
    };
  }

  componentDidMount() {
    this.setState({isMounted: !this.state.isMounted});

    // kwd and type should be added ......
    this.callAPI('offset=' + this.state.offset);
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

  handlePaginationButtons = e => {
    e.preventDefault();

    if (this.state.isMounted !== true) {
      return;
    }

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
      () => {
        this.callAPI('offset=' + this.state.offset);
        modelInstance.updateStoreData('offset', this.state.offset);
      },
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

    const nextButton = (
      <Button
        className="next-button btn btn-orange"
        id="next"
        onClick={this.handlePaginationButtons}
        text={'Show next ' + this.state.itemsPerPage + ' dishes'}
      />
    );

    const previousButton = (
      <Button
        className="previous-button btn btn-orange"
        id="previous"
        onClick={this.handlePaginationButtons}
        text={'Show previous ' + this.state.itemsPerPage + ' dishes'}
      />
    );

    return (
      <div className="dishes col">
        <div className="dish-items-container">{dishesList}</div>
        {this.state.offset === 0 ? (
          nextButton
        ) : (
          <React.Fragment>
            {previousButton}
            {nextButton}
          </React.Fragment>
        )}
      </div>
    );
  }
}

Dishes.propTypes = {
  model: PropTypes.object,
};

export default Dishes;
