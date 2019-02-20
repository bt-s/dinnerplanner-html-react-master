import {APIKey} from './APIKey';
import {StoreUtil /*, print*/} from '../Utils';

const httpOptions = {
  method: 'GET',
  headers: {'X-Mashape-Key': APIKey}
};

class DinnerModel {
  _storeAgent = new StoreUtil({
    selectedDishes: [],
    searchCondition: {keyword: '', type: ''},
    viewingDishID: 1,
    offset: 0,
    numberOfPeople: 0
  });
  _storedDishes = {};
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
      'drink'
    ];

    this.searchCondition = ['', '', 0];
  }

  bindToSelf(func) {
    return func.bind(this);
  }

  updateStoreData(key, value) {
    this._storeAgent.update(key, value);

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
        this.notifyObservers();
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

  URLWithParams(url, params) {
    let urlParams = new URLSearchParams();

    for (let key in params) {
      urlParams.append(key, params[key]);
    }

    return url + '?' + urlParams.toString();
  }

  getViewingDish() {
    return this._storedDishes[this.getStoreData('viewingDishID')];
  }

  addDishToMenu(id) {
    let dishes = this.getStoreData('selectedDishes');

    for (let i = 0; i < dishes.length; i++) {
      if (dishes[i].id === id) {
        return;
      }
    }

    dishes.push(this._storedDishes[id]);
    this.updateStoreData('selectedDishes', dishes);
  }

  requestRecipeInfo(dishID) {
    const APIRecipeInfo =
      'http://sunset.nada.kth.se:8080/iprog/group/30/recipes/{id}/information';

    const url = this.URLWithParams(APIRecipeInfo.replace('{id}', dishID), {
      id: dishID,
      includeNutrition: false
    });

    const options = {
      method: 'GET',
      headers: {
        'X-Mashape-Key': APIKey
      }
    };

    return fetch(url, options)
      .then(res => res.json())
      .then(dish => {
        this._storedDishes[dishID] = dish;
        this.updateStoreData('viewingDishID', dishID);
      })
      .catch(error => {
        if (error.PageNotFound) {
          alert('Sorry, This dish is unvailable');
          throw error;
        }
        alert(error);
      });
  }

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

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter(o => o !== observer);
  }

  notifyObservers(info) {
    this._observers.forEach(o => o.update(info));
  }

  getDishTypes() {
    return [...new Set(this.dishTypes)];
  }
}

export const modelInstance = new DinnerModel(3);
