// Наш контейнер для отрисовки
import TripListView from '../view/trip-list-view.js';
// Контейнер для сортировки
import SortView from '../view/list-sort-view.js';
// Форма редактирования
import EditPointView from '../view/edit-point-view.js';
// Точка маршрута
import PointView from '../view/trip-point-view.js';
// Фильтры
// import ListFilterView from '../view/list-filter-view.js';
// Форма создания
import NewPointView from '../view/new-point-view.js';
//Создайте новую точку
import ListEmptyView from '../view/list-empty-view.js';
// Функция для определения истинности нажатия Escape
import { isEscapeKey } from '../utils.js';
import { render, RenderPosition } from '../render.js';

export default class TripPresenter {
  #pointListComponent = new TripListView();
  #boardContainer = null;
  #pointContainer = null;
  #pointsModel = null;
  #filterContainer = null;
  #listPoints = [];

  constructor({ boardContainer, filterContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];
    this.#renderPointsList();
  }

  // #renderPointsList() {
  //   if (!this.#listPoints.length) {
  //     render(new NewPointView(), this.#boardContainer);
  //     return;
  //   }

  #renderPointsList() {
    if (!this.#listPoints.length) {
      render(new ListEmptyView(), this.#boardContainer);
      return;
    }

    render(new SortView(), this.#boardContainer);
    render(this.#pointListComponent, this.#boardContainer);
    render(new NewPointView(), this.#pointListComponent.element, RenderPosition.AFTERBEGIN);
    this.#listPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointComponent = new PointView({ point });
    const pointEditComponent = new EditPointView({ point });

    // const tripEventsElement = document.querySelector('.trip-events');
    const pointRollupButton = pointComponent.element.querySelector('.event__rollup-btn');
    const editPointForm = pointEditComponent.element.querySelector('form');
    // const editRollupButton = pointEditComponent.element.querySelector('event__rollup-btn');

    const replacePointToEditForm = () => {
      this.#pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
      editPointForm.addEventListener('click', onCloseEditPointForm);
      editPointForm.addEventListener('submit', onCloseEditPointForm);
      document.addEventListener('keydown', onEscKeyDown);
    };

    const replaceEditFormToPoint = () => {
      this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
      editPointForm.removeEventListener('click', onCloseEditPointForm);
      editPointForm.removeEventListener('submit', onCloseEditPointForm);
      document.removeEventListener('keydown', onEscKeyDown);
    };

    function onEscKeyDown(evt) {
      if (isEscapeKey(evt)) {
        onCloseEditPointForm();
      }
    }

    function onCloseEditPointForm() {
      replaceEditFormToPoint();
    }

    pointRollupButton.addEventListener('click', () => {
      replacePointToEditForm();
    });

    render(pointComponent, this.#pointListComponent.element);
  }
}
