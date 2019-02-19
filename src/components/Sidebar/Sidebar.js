import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {computeTotalPrice} from '../../Utils';

import Button from '../Button/Button';
import SidebarHeader from './SidebarHeader';
import SidebarPeople from './SidebarPeople';

import {
  faAngleDown,
  faAngleUp,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfPeople: this.props.model.getStoreData('numberOfPeople'),
      showMenu: false
    };
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

  onNumberOfPeopleChanged = id => {
    const numberOfPeople = this.state.numberOfPeople;

    if (numberOfPeople < 2 && id === 'minusPerson') {
      return;
    }

    id === 'plusPerson'
      ? this.props.model.updateStoreData('numberOfPeople', numberOfPeople + 1)
      : this.props.model.updateStoreData('numberOfPeople', numberOfPeople - 1);
  };

  onMenuToggle = e => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  render() {
    const showMenu = this.state.showMenu;
    const numberOfPeople = this.state.numberOfPeople;
    const dishes = this.props.model.getStoreData('selectedDishes');

    const dishList = dishes.map((dish, i) => (
      <li key={i}>
        <span>{dish.title}</span>
        <span>{dish.pricePerServing}</span>
      </li>
    ));

    const sidebarSubHeader = (
      <div className="sidebar-sub-header">
        <span>Dish Name</span>
        <span>Cost</span>
      </div>
    );

    const totalPrice = computeTotalPrice(numberOfPeople, dishes);

    return (
      <div className={showMenu ? 'sidebar col menu-open' : 'sidebar col'}>
        <SidebarHeader
          onMenuToggle={this.onMenuToggle}
          barsIcon={faBars}
          timesIcon={faTimes}
        />

        <div className="sidebar-menu">
          <SidebarPeople
            numberOfPeople={numberOfPeople}
            onNumberOfPeopleChanged={this.onNumberOfPeopleChanged}
            arrowUp={faAngleUp}
            arrowDown={faAngleDown}
          />

          {sidebarSubHeader}

          <ul>{dishList}</ul>

          <div>TOTAL: {totalPrice} SEK</div>

          <Link to="/dinner-overview">
            <Button text="Confirm Dinner" />
          </Link>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  model: PropTypes.object
};

export default Sidebar;
