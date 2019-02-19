import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import Loader from '../Loader/Loader';

class DishDetail extends React.Component {
  constructor(props) {
    super(props);

    this.dishID = parseInt(window.location.pathname.substr(6));

    this.state = {
      hasData: false,
      numberOfPeople: this.props.model.getStoreData('numberOfPeople'),
      selectedDishes: []
    };

    props.model.requestRecipeInfo(this.dishID).then(() => {
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
    const selectedDishes = model.getStoreData('selectedDishes');

    const totalPrice = parseInt(
      viewingDish.pricePerServing * this.state.numberOfPeople
    ).toFixed(2);

    const ingredientList = viewingDish.extendedIngredients.map(
      (ingredient, i) => (
        <tr key={i}>
          <td>
            {ingredient.amount + ' ' + ingredient.measures.metric.unitShort}
          </td>
          <td>{ingredient.name}</td>
        </tr>
      )
    );

    return (
      <div className="dish-detail-container">
        <div className="dish-details-overview">
          <div className="dish-description-wrapper">
            <div id="dishDescription" className="dish-description">
              <h2 id="dishTitle">{viewingDish.title}</h2>
              <img
                id="detailImg"
                src={viewingDish.image}
                alt={viewingDish.title}
              />
              <p id="detailDescription">{viewingDish.instructions}</p>
            </div>
            <Link
              to="/search"
              id="backToSearchButton"
              className="btn btn-orange btn-pointy">
              Back to search
            </Link>
          </div>

          <div className="dish-ingredients">
            <div className="dish-ingredients-heading">
              <span>Ingredients For </span>
              <span id="numberOfGuests">{this.state.numberOfPeople}</span>
              <span> People</span>
            </div>
            <hr />
            <table id="listOfIngredients">
              <tbody>{ingredientList}</tbody>
            </table>
            <hr />
            <Button
              onClick={e => {
                model.addDishToMenu(this.dishID);
              }}
              text="Add to menu"
            />
            <span className="total-price">TOTAL: {totalPrice} SEK</span>
          </div>
        </div>
        <section id="prepSection">
          <h2>Preparation</h2>
          <p id="prepText">{viewingDish.instructions}</p>
        </section>
      </div>
    );
  }
}

DishDetail.propTypes = {
  model: PropTypes.object
};

export default DishDetail;
