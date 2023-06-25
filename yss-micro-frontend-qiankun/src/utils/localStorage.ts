interface ILocalStorage {
  setItem(key: string, value: any): void;
  getItem(key: string): any;
  removeItem(key: string): void;
  clear(): void;
}

class LocalStorage implements ILocalStorage {
  // constructor() {
  //   this.init();
  // }

  // init() {
  //   window.localStorage.getItem = this.getItem;
  //   window.localStorage.setItem = this.setItem;
  //   window.localStorage.removeItem = this.removeItem;
  //   window.localStorage.clear = this.clear;
  // }
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

export default new LocalStorage();
// export { LocalStorage };
