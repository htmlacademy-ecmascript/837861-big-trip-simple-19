//Импортируем родительский абстрактный класс, от которого будем наследоваться
import AbstractView from '../framework/view/abstract-view.js';

function createTripListTemplate() {
  return (
    `<ul class="trip-events__list">
    </ul>`
  );
}

export default class TripListView extends AbstractView {
  // export default class TripListView {
  //   #element = null;

  get template() {
    return createTripListTemplate();
  }
}
