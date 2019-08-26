import {createElement, unrender} from '../utils';

export default class Component {
  constructor() {
    this._element = null;
  }

  set element(value) {
    this._element = value;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement(template, element = null, value = null) {
    unrender(template);
    if (element) {
      this.element = value;
    }
  }

  getTemplate() {
    throw Error(`Abstract method not implemented`);
  }
}
