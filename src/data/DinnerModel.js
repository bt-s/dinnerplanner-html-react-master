import { APIKey } from './APIKey';
import { StoreUtil, print } from '../Utils';

const httpOptions = {
  method: 'GET',
  headers: { 'X-Mashape-Key': APIKey }
};

class DinnerModel {
  _userDataTemplate = {
    selectedDishes: [],
    searchCondition: { kwd: '', type: '' },
    viewingDishID: '2',
    offset: 0,
    numberOfGuests: 0
  };
  _storeAgent = new StoreUtil({
    selectedDishes: [],
    searchCondition: { kwd: '', type: '' },
    viewingDishID: '2',
    offset: 0,
    numberOfGuests: 0
  });
  _observers = [];

  constructor(num = 1, readLocal = true) {
    this.setNumberOfGuests(num);
    if (readLocal) {
      this._storeAgent.load();
    }
  }

  bindToSelf(func) {
    return func.bind(this);
  }

  updateStoreData(key, value) {
    this._storeAgent.update(key, value);
  }
  getStoreData(key) {
    return this._storeAgent.get(key);
  }

  storeData() {
    this._storeAgent.save();
  }

  setNumberOfGuests(num) {
    this.updateStoreData('numberOfGuests', num);
    this.notifyObservers();
  }
  getNumberOfGuests() {
    return this.getStoreData('numberOfGuests');
  }

  // API Calls
  getAllDishes(params) {
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
}

export const modelInstance = new DinnerModel(3);
