import PointView from '../view/trip-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { isEscapeKey } from '../utils.js';
import { render, replace, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #boardContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #handleModeChange = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({ boardContainer, onModeChange }) {
    this.#boardContainer = boardContainer;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onRollupButtonClick: this.#handleEditClick,
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit,
      onRollupBtnClick: this.#handleRollupButtonClick
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#boardContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  }

  #replacePointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
  };

  #handleFormSubmit = () => {
    this.#replaceEditFormToPoint();
  };

  #handleRollupButtonClick = () => {
    this.#replaceEditFormToPoint();
  };
}
