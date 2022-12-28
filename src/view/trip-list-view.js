// import AbstractView from '../framework/view/abstract-view.js';

// function createTripListTemplate() {
//   return '<ul class="trip-events__list"></ul>';
// }
// createTripListTemplate();

// export default class TripListView extends AbstractView {
//   get template() {
//     return createTripListTemplate();
//   }
// }


function createTripListTemplate() {
  return `<ul class="trip-events__list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  </ul>`;
}
createTripListTemplate();

export default class TripListView {
  get template() {
    return createTripListTemplate();
  }
}
