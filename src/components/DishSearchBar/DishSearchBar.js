import React from 'react';
import PropTypes from 'prop-types';

import {titalizeWords} from '../../Utils';

class DishSearchBar extends React.Component {
  constructor(props) {
    super(props);
    const searchCondition = this.props.model.getStoreData('searchCondition');
    this.state = {
      keyword: searchCondition.keyword,
      type: searchCondition.type,
      offset: searchCondition.offset
    };
  }

  componentDidMount() {
    this.props.model.addObserver(this);
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  update() {
    const searchCondition = this.props.model.getStoreData('searchCondition');
    const newOffset = this.props.model.getStoreData('offset');
    this.setState({
      offset: newOffset,
      keyword: searchCondition.keyword,
      type: searchCondition.type
    });
  }

  onHandleInputChange = e => {
    this.setState({keyword: e.target.value});
  };

  onHandleSelectChange = e => {
    this.setState({type: e.target.value});
  };

  onHandleSubmit = e => {
    this.props.model.updateStoreData('searchCondition', {
      keyword: this.state.keyword,
      type: this.state.type,
      offset: this.state.offset
    });
    e.preventDefault();
  };

  render() {
    const dishTypes = this.props.model.getDishTypes().map((type, i) => {
      let value = titalizeWords(type);
      let option = (
        <option key={i} value={value}>
          {value}
        </option>
      );
      return option;
    });

    return (
      <div className="search-bar col">
        <h2>Find a dish</h2>
        <div className="search-bar-container col">
          <form onSubmit={this.onHandleSubmit}>
            <input
              className="keyword-input"
              type="text"
              placeholder="Enter key word"
              value={this.state.keyword}
              onChange={this.onHandleInputChange}
            />
            <select
              className="dish-type-select"
              value={this.state.type}
              onChange={this.onHandleSelectChange}>
              <option value="">All</option>
              {dishTypes}
            </select>
            <input
              className="btn btn-orange btn-search-dish"
              type="submit"
              value="Search"
            />
          </form>
        </div>
      </div>
    );
  }
}

DishSearchBar.propTypes = {
  model: PropTypes.object
};

export default DishSearchBar;
