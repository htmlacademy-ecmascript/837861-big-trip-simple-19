import NewFilterView from '../view/filters-view.js';
// import NewSortingView from '../view/sorting-view.js';
// import NewPointAddingView from '../view/adding-point-view.js';
import PointsListView from '../view/adding-points-list.js';
import { render } from '../render';

export default class Presenter {
  pointsList = new PointsListView();
  filterComponent = new NewFilterView();

  constructor(pointsContainer) {
    this.pointsContainer = pointsContainer;
  }

  init = () => {
    render(this.pointsList, this.pointsContainer);
  };
}
