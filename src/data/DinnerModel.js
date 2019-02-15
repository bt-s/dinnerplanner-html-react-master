import { APIKey } from './APIKey';
import { StoreUtil, print } from '../Utils';

const httpOptions = {
  headers: { 'X-Mashape-Key': APIKey }
};

class DinnerModel {
  // this template was used as a reference for reading and storing data locally
  _storeTemplate = {
    currentScreen: '',
    numberOfGuests: 1,
    selectedDishes: [1, 2, 3, 4, 5],
    searchCondition: { kwd: '', type: '' },
    viewingDishID: '',
    offset: 0
  };
  _storeAgent = new StoreUtil();
  numberOfGuests;
  observers = [];
  constructor(num = 1, readLocal = true) {
    this.numberOfGuests = num;
    // setting up store agent
    for (const key in this.storeTemplate) {
      this._storeAgent.add(key, this.storeTemplate[key]);
    }
    if (readLocal) {
      this._storeAgent.load();
    }
    print(this._storeAgent.typeParser('9887', 'number'));
    print(this._storeAgent.typeParser(12345, 'string'));
    print(
      this._storeAgent.typeParser('[0, "b", "j", "e", "c", "t"]', 'object')
    );
  }

  setNumberOfGuests(num) {
    this.numberOfGuests = num;
    this._storeAgent.update(this._storeTemplate.numberOfGuests, num);
    this.notifyObservers();
  }
  getNumberOfGuests() {
    return this.numberOfGuests;
  }

  // API Calls
  getAllDishes(params) {
    const url =
      'http://sunset.nada.kth.se:8080/iprog/group/30/recipes/search' +
      '?' +
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
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notifyObservers() {
    this.observers.forEach(o => o.update());
  }
}

export const modelInstance = new DinnerModel(3);
