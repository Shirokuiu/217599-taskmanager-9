export default class Controller {
  constructor() {
    this._container = null;
  }

  set container(value) {
    if (!this._container) {
      this._container = value;
    }
  }

  get container() {
    return this._container;
  }

  init() {}
}
