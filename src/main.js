import NewFilterView from './view/filters-view.js';
import NewSortingView from './view/sorting-view.js';
import NewFormEditView from './view/edit-form-view.js';
import NewPointAddingView from './view/adding-point-view';

// import NewEventsListView from './view/point-list-view.js';
import { render } from './render.js';

const tripFilter = document.querySelector('.trip-controls__filters');
const tripEventsSorting = document.querySelector('.trip-events');
// const tripEventsSorting = document.querySelector('.trip-events');

// render(new NewEventsListView(), tripEventsSorting);
render(new NewFilterView(), tripFilter);
render(new NewSortingView(), tripEventsSorting);
render(new NewFormEditView(), tripEventsSorting);
render(new NewPointAddingView(), tripEventsSorting);


