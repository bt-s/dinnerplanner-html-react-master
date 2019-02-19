import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from '../Sidebar/Sidebar';
import Loader from '../Loader/Loader';

class DishDetail extends React.Component {
  constructor(props) {
    super(props);
    this.dishID = parseInt(window.location.pathname.substr(6)); // /dish/id
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
    const viewingDish = this.props.model.getViewingDish();

    const selectedDishes = this.props.model.getStoreData('selectedDishes');

    const totalPrice =
      selectedDishes === undefined || selectedDishes.length === 0
        ? 'TOTAL: 0'
        : 'TOTAL: ' +
          this.state.numberOfPeople *
            this.props.model.getStoreData('selectedDishes').reduce((a, b) => {
              return (
                parseFloat(
                  a.hasOwnProperty('pricePerServing') ? a.pricePerServing : a
                ) + parseFloat(b.pricePerServing)
              ).toFixed(2);
            }) +
          ' SEK';
    let ingredientList = [];
    viewingDish.extendedIngredients.forEach(ingredient => {
      let tableItem = (
        <tr>
          <td>
            {ingredient.amount + ' ' + ingredient.measures.metric.unitShort}
          </td>
          <td>{ingredient.name}</td>
        </tr>
      );
      ingredientList.push(tableItem);
    });
    return (
      <div className="dish-detail-page">
        <Sidebar model={this.props.model} />
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
                back to search
              </Link>
            </div>

            <div className="dish-ingredients">
              <div className="dish-ingredients-heading">
                <span>Ingredients For </span>
                <span id="numberOfGuests">{this.state.numberOfPeople}</span>
                <span> People</span>
              </div>
              <hr />
              <table id="listOfIngredients">{ingredientList}</table>
              <hr />
              <div id="ingredientTotal">
                <span id="dishPrice">{totalPrice}</span>
                <button
                  id="addToMenuButton"
                  className="btn btn-orange"
                  onClick={e => {
                    this.props.model.addDishToMenu(this.dishID);
                  }}>
                  Add to menu
                </button>
              </div>
            </div>
          </div>
          <section id="prepSection">
            <h2>Preparation</h2>
            <p id="prepText">{viewingDish.instructions}</p>
          </section>
        </div>
      </div>
    );
  }
}

DishDetail.propTypes = {
  model: PropTypes.object
};

export default DishDetail;
