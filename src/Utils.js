const DEBUG_MODE = true;

const print = (...info) => {
  if (DEBUG_MODE) {
    console.log(...info);
  }
};

class StoreUtil {
  constructor() {
    //map to store key-value pairs
    this.dbMap = {};
  }

  get(k) {
    if (!this.dbMap[k]) {
      print('key', k, "doesn't exist");
      return false;
    }
    return this.dbMap[k].value;
  }

  //if you lockType, it will try to convert loaded data to the type when you save it
  add(k, v, typeLock = true) {
    if (this.dbMap[k]) {
      console.error('key ' + k + ' already exists');
      return false;
    }
    let item = {};
    item.value = v;
    if ((item.locked = typeLock)) {
      item.type = typeof v;
    }
    this.dbMap[k] = item;
    return this;
  }

  remove(k) {
    if (!this.dbMap[k]) {
      console.error('key ' + k + " doesn't exist");
      return false;
    }
    delete this.dbMap[k];
    return this;
  }

  update(k, v) {
    if (!this.dbMap[k]) {
      console.error('key ' + k + " doesn't exist");
      return false;
    }
    if (this.dbMap[k].locked) {
      if (typeof v !== this.dbMap[k].type) {
        print(
          'type of',
          v,
          'does not match the locked type which is',
          this.dbMap[k].type
        );
      }
    }
    this.dbMap[k] = v;
    return this;
  }

  typeParser(value, newType) {
    const parser = {
      number: input => parseInt(input),
      object: input =>
        typeof input === 'string'
          ? JSON.parse(input)
          : console.error(
              input,
              "is not a string, can't be parsed to an object"
            ),
      string: input => input.toString()
    };
    if (!parser[newType]) {
      console.error("Can't parse to type", newType);
      return false;
    }
    print('v', value, 'type', typeof value, 'parser', parser[typeof value]);
    print('new type is', newType);
    return parser[newType](value);
  }

  // read from local according to registered keys in dbMap
  load() {
    for (const key in this.dbMap) {
      if (localStorage[key]) {
        print('locked?', this.dbMap[key].locked);
        //convert type
        let newVal = this.dbMap[key].locked
          ? this.typeParser(localStorage[key], this.dbMap[key].type)
          : localStorage[key];

        this.update(key, 1);
      }
    }
  }

  save() {
    for (const key in this.dbMap) {
      if (this.dbMap.hasOwnProperty(key)) {
        localStorage.setItem(key, this.dbMap[key]);
      }
    }
  }
}

export { StoreUtil, print };
