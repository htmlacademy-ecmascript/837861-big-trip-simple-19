import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import EditFormView from './view/edit-form-view.js';
import AddingPointView from './view/adding-point-view.js';
// import Presenter from '../src/presenter/presenter.js';
import { render } from './render.js';

const tripFilter = document.querySelector('.trip-controls__filters');
const tripEventsSorting = document.querySelector('.trip-events');
// const eventPresenter = new Presenter({ pointsContainer: tripEventsSorting });

render(new FiltersView(), tripFilter);
render(new SortingView(), tripEventsSorting);
render(new EditFormView(), tripEventsSorting);
render(new AddingPointView(), tripEventsSorting);

// eventPresenter.init();
