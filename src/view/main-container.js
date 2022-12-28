import { createElement } from '../render.js';

const markUp = '<ul class="trip-events__list"></section>';

function createContainerTemplate() {
  return markUp;
}

export default class MainList {
  getTemplate() {
    return createContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
