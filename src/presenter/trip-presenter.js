// Наш контейнер для отрисовки
import TripListView from '../view/trip-list-view.js';
// Контейнер для сортировки
import SortView from '../view/list-sort-view.js';
// Форма редактирования
import EditPointView from '../view/edit-point-view.js';
// Точка маршрута
import PointView from '../view/trip-point-view.js';
//Импортируем PointPresenter
import PointPresenter from './point-presenter.js';
// Фильтры
// import ListFilterView from '../view/list-filter-view.js';
// Форма создания
import NewPointView from '../view/new-point-view.js';
//Создайте новую точку
import ListEmptyView from '../view/list-empty-view.js';
// Функция для определения истинности нажатия Escape
import { isEscapeKey } from '../utils.js';
//Импортируем render из папки framework
import { render, RenderPosition } from '../framework/render.js';

export default class TripPresenter {
  #pointListComponent = new TripListView();
  #boardContainer = null;
  #pointsModel = null;
  #listPoints = [];
  #emptyListComponent = new ListEmptyView;
  #pointPresenter = new Map();

  constructor({ boardContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    // this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];
    this.#renderPointsList();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPointsList() {
    if (!this.#listPoints.length) {
      this.#renderEmptyList();
      return;
    }

    // render(new SortView(), this.#boardContainer);
    render(this.#pointListComponent, this.#boardContainer);
    render(new NewPointView(), this.#pointListComponent.element, RenderPosition.AFTERBEGIN);
    this.#listPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderEmptyList = () => {
    render(this.#emptyListComponent, this.#boardContainer);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      boardContainer: this.#boardContainer,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);


    // const onEscKeyDown = (evt) => {
    //   if (isEscapeKey(evt)) {
    //     evt.preventDefault();
    //     replaceEditFormToPoint();

    //     document.removeEventListener('keydown', onEscKeyDown);
    //   }
    // };

    // const pointComponent = new PointView({
    //   point,
    //   onRollupBtnClick: () => {
    //     replacePointToEditForm.call(this);
    //     document.addEventListener('keydown', onEscKeyDown);
    //   }
    // });
    // const pointEditComponent = new EditPointView({
    //   point,
    //   onFormSubmit: () => {
    //     replaceEditFormToPoint.call(this);
    //     document.removeEventListener('keydown', onEscKeyDown);
    //   },

    //   onRollupBtnClick: () => {
    //     replaceEditFormToPoint.call(this);
    //     document.removeEventListener('keydown', onEscKeyDown);
    //   }
    // });

    // const replacePointToEditForm = () => {
    //   this.#pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    // };

    // const replaceEditFormToPoint = () => {
    //   this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    // };

    // render(pointComponent, this.#pointListComponent.element);
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
