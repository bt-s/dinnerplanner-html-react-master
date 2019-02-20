import React from 'react';
import PropTypes from 'prop-types';

import {titalizeWords} from '../../Utils';

class DishSearchBar extends React.Component {
  constructor(props) {
    super(props);
    const searchCondition = this.props.model.getStoreData('searchCondition');
    this.state = {
      keyword: searchCondition[0],
      type: searchCondition[1],
      offset: searchCondition[2],
      // searchCondition: this.props.model.getStoreData('searchCondition'),
    };
  }

  componentDidMount() {
    this.props.model.addObserver(this);
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // what's the purpose of this function?
  // now search condition is disappeared after refresh
  update() {
    const searchCondition = this.props.model.getStoreData('searchCondition');
    const newOffset = this.props.model.getStoreData('offset');
    this.setState({
      offset: newOffset,
      keyword: searchCondition[0],
      type: searchCondition[1],
    });
  }

  onHandleInputChange = e => {
    this.setState({keyword: e.target.value});
  };

  onHandleSelectChange = e => {
    this.setState({type: e.target.value});
  };

  onHandleSubmit = e => {
    this.props.model.updateStoreData('searchCondition', [
      this.state.keyword,
      this.state.type,
      this.state.offset,
    ]);
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
              onChange={this.onHandleSelectChange}
            >
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
  model: PropTypes.object,
};

export default DishSearchBar;
