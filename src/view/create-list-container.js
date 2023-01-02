import { createElement } from '../render.js';

const markUp = '<ul class="main-container"></ul>';
function createNewListContainerTemplate() {
  return markUp;
}

export default class CreateListContainer {
  getTemplate() {
    return createNewListContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement = () => {
    this.element = null;
  };
}
