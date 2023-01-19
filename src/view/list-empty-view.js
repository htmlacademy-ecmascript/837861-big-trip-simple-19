import { createElement } from '../render.js';

const createListEmptyElementTemplate = () =>
  ('<p class="trip-events__message">Click New Event to create first point</p>');

export default class ListEmptyView {
  #element = null;

  get template() {
    return createListEmptyElementTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

}

