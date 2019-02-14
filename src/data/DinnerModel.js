import { APIKey } from "./APIKey";

const httpOptions = {
  headers: { "X-Mashape-Key": APIKey }
};

class DinnerModel {
  numberOfGuests;
  observers = [];
  constructor(num) {
    this.numberOfGuests = num;
  }

  setNumberOfGuests(num) {
    this.numberOfGuests = num;
    this.notifyObservers();
  }
  getNumberOfGuests() {
    return this.numberOfGuests;
  }

  // API Calls
  getAllDishes() {
    const url = "http://sunset.nada.kth.se:8080/iprog/group/30/recipes/search";
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
        console.error("getAllDishes() API Error:", error.message || error);
      });
    } else {
      console.error("getAllDishes() API Error:", error.message || error);
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
