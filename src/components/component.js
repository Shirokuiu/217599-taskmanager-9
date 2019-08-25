import {createElement, unrender} from '../utils';

export default class Component {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement(template, element = null) {
    unrender(template);
    if (element) {
      element = null;
    }
  }

  getTemplate() {
    throw Error(`Abstract method not implemented`);
  }
}
