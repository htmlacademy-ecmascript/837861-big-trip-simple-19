//Импортируем родительский абстрактный класс, от которого будем наследоваться
import AbstractView from '../framework/view/abstract-view.js';

const createListEmptyElementTemplate = () =>
  ('<p class="trip-events__message">Click New Event to create first point</p>');


export default class ListEmptyView extends AbstractView {

  get template() {
    return createListEmptyElementTemplate();
  }
}

