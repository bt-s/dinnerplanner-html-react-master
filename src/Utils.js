const DEBUG_MODE = 0;

const kebabCase = string =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

const print = (...info) => {
  if (DEBUG_MODE) {
    console.log(...info);
  }
};

class StoreUtil {
  constructor(template) {
    //map to store key-value pairs
    this.dbMap = {};
    if (template) {
      for (const key in template) {
        this.add(key, template[key]);
      }
    }
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
        console.error(
          'type of',
          v,
          'does not match the locked type which is',
          this.dbMap[k].type,
        );
      }
    }
    this.dbMap[k].value = v;
    return this;
  }

  typeParser(value, newType) {
    const parser = {
      number: input => (isNaN(parseInt(input)) ? 0 : parseInt(input)),
      object: input =>
        typeof input === 'string'
          ? JSON.parse(input)
          : console.error(
              input,
              "is not a string, can't be parsed to an object",
            ),
      string: input =>
        typeof input === 'object' ? JSON.stringify(input) : input.toString(),
    };
    if (!parser[newType]) {
      console.error("Can't parse to type", newType);
      return false;
    }
    return parser[newType](value);
  }

  // read from local according to registered keys in dbMap
  load() {
    for (const key in this.dbMap) {
      if (localStorage[key]) {
        //convert type
        let newVal = this.dbMap[key].locked
          ? this.typeParser(localStorage[key], this.dbMap[key].type)
          : localStorage[key];
        this.update(key, newVal);
      }
    }
  }

  save() {
    for (const key in this.dbMap) {
      localStorage.setItem(
        key,
        this.typeParser(this.dbMap[key].value, 'string'),
      );
    }
  }
}

export {kebabCase, StoreUtil, print};
