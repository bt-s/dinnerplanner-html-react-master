import React from 'react';
import PropTypes from 'prop-types';

import {titalizeWords} from '../../Utils';

class SearchDish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: this.props.model.getStoreData('searchCondition')[0],
      type: this.props.model.getStoreData('searchCondition')[1],
      offset: this.props.model.getStoreData('offset'),
      searchCondition: this.props.model.getStoreData('searchCondition'),
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
      offset: this.props.model.getStoreData('offset'),
      searchCondition: this.props.model.getStoreData('searchCondition'),
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

SearchDish.propTypes = {
  model: PropTypes.object,
};

export default SearchDish;
