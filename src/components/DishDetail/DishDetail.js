import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../Loader/Loader';
import DishDescription from './DishDescription';
import DishIngredients from './DishIngredients';

class DishDetail extends React.Component {
  constructor(props) {
    super(props);

    this.dishId = parseInt(window.location.pathname.substr(6));

    this.state = {
      hasData: false,
      numberOfPeople: this.props.model.getStoreData('numberOfPeople')
    };

    props.model.requestRecipeInfo(this.dishId).then(() => {
      this.setState({hasData: true});
    });
  }

  componentDidMount() {
    this.props.model.addObserver(this);
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  update() {
    this.setState({
      numberOfPeople: this.props.model.getStoreData('numberOfPeople')
    });
  }

  render() {
    if (!this.state.hasData) {
      return <Loader />;
    }

    const model = this.props.model;
    const viewingDish = model.getViewingDish();

    return (
      <div className="dish-detail-container">
        <section className="dish-details-overview">
          <DishDescription model={model} />
          <DishIngredients
            dishId={this.dishId}
            model={model}
            numberOfPeople={this.state.numberOfPeople}
          />
        </section>
        <section>
          <h2>Preparation</h2>
          <p>{viewingDish.instructions}</p>
        </section>
      </div>
    );
  }
}

DishDetail.propTypes = {
  model: PropTypes.object
};

export default DishDetail;
