// import { render, RenderPosition } from '../render.js';

// // Наш контейнер для отрисовки
// import TripListView from '../view/trip-list-view.js';
// // Контейнер для сортировки
// import SortView from '../view/list-sort-view.js';
// // Форма редактирования
// import EditPointView from '../view/edit-point-view.js';
// // Точка маршрута
// import PointView from '../view/trip-point-view.js';
// // Фильтры
// import ListFilterView from '../view/list-filter-view.js';
// // Форма создания
// import NewPointView from '../view/new-point-view.js';


// export default class TripPresenter {

//   // Создаем новый контейнер ul
//   tripListComponent = new TripListView();
//   // Указываем параметры конструктору
//   constructor({ boardContainer, filterContainer, pointsModel }) {
//     this.boardContainer = boardContainer;
//     this.filterContainer = filterContainer;
//     this.pointsModel = pointsModel;
//   }

//   init() {
//     // Точки на основании модели
//     this.listPoints = [...this.pointsModel.points];
//     // Фильтры отрисовываем в контейнер для фильтров
//     render(new ListFilterView(), this.filterContainer);
//     // Затем сортировка в Контейнер для отрисовки
//     render(new SortView(), this.boardContainer);
//     // Затем TripListView добаляем в Контейнер для отрисовки (передадим в main)
//     render(this.tripListComponent, this.boardContainer);
//     // Добавляем форму создания в TripListView
//     render(new NewPointView(), this.tripListComponent.element, RenderPosition.AFTERBEGIN);
//     // Точку маршрута рисуем три раза
//     for (let i = 0; i < this.listPoints.length; i++) {
//       render(new PointView({ point: this.listPoints[i] }), this.tripListComponent.element);
//     }
//     //
//     // Добавляем форму редактирования в TripListView
//     render(new EditPointView(this.listPoints[0]), this.tripListComponent.element, RenderPosition.AFTERBEGIN);
//     // render(new EditPointViewState(this.listPoints[0]), this.tripListComponent.element, RenderPosition.AFTERBEGIN);
//   }
// }

import { render, RenderPosition } from '../render.js';

// Наш контейнер для отрисовки
import TripListView from '../view/trip-list-view.js';
// Контейнер для сортировки
import SortView from '../view/list-sort-view.js';
// Форма редактирования
import EditPointView from '../view/edit-point-view.js';
// Точка маршрута
import PointView from '../view/trip-point-view.js';
// Фильтры
import ListFilterView from '../view/list-filter-view.js';
// Форма создания
import NewPointView from '../view/new-point-view.js';


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

  #renderPointsList() {
    if (!this.#listPoints.length) {
      render(new NewPointView(), this.#boardContainer);
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

    const pointRollupButton = pointComponent.element.querySelector('.event__rollup-btn');
    const editPointForm = pointEditComponent.element.querySelector('form');
    const editRollupButton = pointEditComponent.element.querySelector('event__rollup-btn');

    const replacePointToEditForm = () => {
      this.#pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
      editRollupButton.addEventListener('click', onCloseEditPointForm);
      editPointForm.addEventListener('submit', onCloseEditPointForm);
      document.addEventListener('keydown', onEscKeyDown);
    }

    const replaceEditFormToPoint = () => {
      this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
      editRollupButton.removeEventListener('click', onCloseEditPointForm);
      editPointForm.removeEventListener('submit', onCloseEditPointForm);
      document.removeEventListener('keydown', onEscKeyDown);
    }

    function onEscKeyDown(evt) {
      if (isEscapeKey) {
        onCloseEditPointForm(evt);
      }
    }

    function onCloseEditPointForm() {
      evt.preventDefault();
      replaceEditFormToPoint();
    }

    pointRollupButton.addEventListener('click', () => {
      replacePointToEditForm();
    });

    render(pointComponent, this.#pointListComponent.element);
  }
}
