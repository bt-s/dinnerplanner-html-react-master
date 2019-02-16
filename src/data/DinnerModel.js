'use strict';
import { APIKey } from './APIKey';
import { StoreUtil, print } from '../Utils';

const httpOptions = {
  method: 'GET',
  headers: { 'X-Mashape-Key': APIKey }
};

class DinnerModel {
  _userData = {
    selectedDishes: [],
    searchCondition: { kwd: '', type: '' },
    viewingDishID: '2',
    offset: 0,
    numberOfGuests: 0
  };
  _storeAgent = new StoreUtil();
  _observers = [];

  constructor(num = 1, readLocal = true) {
    this.setNumberOfGuests(num);
    // setting up store agent
    for (const key in this._userData) {
      this._storeAgent.add(key, this._userData[key]);
    }
    print('dbmap!!!!!', this._storeAgent.dbMap);
    if (readLocal) {
      this.injectData();
    }
    print(this._storeAgent.typeParser('9887', 'number'));
    print(this._storeAgent.typeParser(12345, 'string'));
    print(
      this._storeAgent.typeParser('[0, "b", "j", "e", "c", "t"]', 'object')
    );
  }

  bindToSelf(func) {
    return func.bind(this);
  }

  injectData() {
    this._storeAgent.load();
    for (const key in this._userData) {
      this._userData[key] = this._storeAgent.get(key);
    }
    print('Data injected!!!!!', this._userData);
  }

  storeData() {
    this._storeAgent.update('pathName', window.location.pathname);
    this._storeAgent.update('numberOfGuests', this.getNumberOfGuests());
    this._storeAgent.save();
  }

  setNumberOfGuests(num) {
    this._userData.numberOfGuests = num;
    this.notifyObservers();
  }
  getNumberOfGuests() {
    return this._userData.numberOfGuests;
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
