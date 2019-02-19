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
      numberOfPeople: this.props.model.getStoreData('numberOfPeople')
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
        <section className="dish-details-overview">
          <div className="dish-description">
            <h2>{viewingDish.title}</h2>
            <img src={viewingDish.image} alt={viewingDish.title} />
            <p>{viewingDish.instructions}</p>
            <Link
              to="/search"
              id="backToSearchButton"
              className="btn btn-orange btn-pointy">
              Back to search
            </Link>
          </div>

          <div className="dish-ingredients">
            <div className="dish-ingredients-heading">
              Ingredients For {this.state.numberOfPeople} People
            </div>
            <hr />
            <table>
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
