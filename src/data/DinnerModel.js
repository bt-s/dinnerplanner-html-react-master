import {APIKey} from './APIKey';
import {StoreUtil, print} from '../Utils';

const httpOptions = {
  method: 'GET',
  headers: {'X-Mashape-Key': APIKey},
};

class DinnerModel {
  _storeAgent = new StoreUtil({
    selectedDishes: [],
    searchCondition: {kwd: '', type: ''},
    viewingDishID: '2',
    offset: 0,
    numberOfPeople: 0,
  });
  _observers = [];

  constructor(num = 1, readLocal = true) {
    this.updateStoreData('numberOfPeople', num);
    if (readLocal) {
      this._storeAgent.load();
    }

    this.dishTypes = [
      'main course',
      'side dish',
      'dessert',
      'appetizer',
      'salad',
      'bread',
      'breakfast',
      'soup',
      'beverage',
      'sauce',
      'drink',
    ];

    this.searchCondition = ['', '', 0];
  }

  bindToSelf(func) {
    return func.bind(this);
  }

  updateStoreData(key, value) {
    this._storeAgent.update(key, value);
    // notify observers
    switch (key) {
      case 'numberOfPeople':
        this.notifyObservers();
        break;
      case 'offset':
        this.notifyObservers();
        break;
      case 'searchCondition':
        this.notifyObservers();
        break;
      case 'selectedDishes':
        break;
      default:
        break;
    }
  }
  getStoreData(key) {
    return this._storeAgent.get(key);
  }

  storeData() {
    this._storeAgent.save();
  }

  // API Calls
  getAllDishes(type, kwd, offset) {
    let params = new URLSearchParams();
    if (type) params.append('type', type);
    if (kwd) params.append('query', kwd);
    params.append('offset', offset);

    const url =
      'http://sunset.nada.kth.se:8080/iprog/group/30/recipes/search?' +
      params.toString();

    return fetch(url, httpOptions)
      .then(this.processResponse)
      .catch(this.handleError);
  }

  // API Helper methods
  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }

  handleError(error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error);
      });
    } else {
      console.error('getAllDishes() API Error:', error.message || error);
    }
  }

  // Observer pattern
  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter(o => o !== observer);
  }

  notifyObservers() {
    this._observers.forEach(o => o.update());
  }

  getDishTypes() {
    return [...new Set(this.dishTypes)];
  }
}

export const modelInstance = new DinnerModel(3);
