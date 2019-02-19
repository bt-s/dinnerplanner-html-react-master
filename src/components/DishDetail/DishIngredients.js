import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

const DishIngredients = props => {
  const viewingDish = props.model.getViewingDish();

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

  const totalPrice = parseInt(
    viewingDish.pricePerServing * props.numberOfPeople
  ).toFixed(2);

  return (
    <div className="dish-ingredients">
      <div className="dish-ingredients-heading">
        Ingredients For {props.numberOfPeople} People
      </div>
      <hr />
      <table>
        <tbody>{ingredientList}</tbody>
      </table>
      <hr />
      <Button
        onClick={e => props.model.addDishToMenu(props.dishId)}
        text="Add to menu"
      />
      <span className="total-price">TOTAL: {totalPrice} SEK</span>
    </div>
  );
};

DishIngredients.propTypes = {
  dishId: PropTypes.number,
  model: PropTypes.object,
  numberOfPeople: PropTypes.number
};

export default DishIngredients;
