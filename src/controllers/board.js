import Board from "../components/board";
import BoardTasks from "../components/board-tasks";
import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import Sort from "../components/sort";
import LoadMore from "../components/load-more";

import {render, Position, APP_SETTINGS} from "../utils";

export default class BoardController {
  constructor(container, taskMocks) {
    this._container = container;
    this._taskMocks = taskMocks;
    this._board = new Board();
    this._boardTasks = new BoardTasks();
    this._sort = new Sort();
    this._loadMore = new LoadMore();
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._boardTasks.getElement(), Position.BEFOREEND);
    this._taskMocks.slice(0, APP_SETTINGS.tasksToShow).forEach((taskMock) => this._renderTask(taskMock));
    render(this._board.getElement(), this._loadMore.getElement(), Position.BEFOREEND);
    this._loadMore.getElement().addEventListener(`click`, this._onLoadMoreClick.bind(this));
  }

  _renderTask(taskMocks) {
    const task = new Task(taskMocks);
    const taskEdit = new TaskEdit(taskMocks);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._boardTasks.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        taskEdit.removeElement(taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._boardTasks.getElement().replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEdit.getElement().querySelector(`.card__text`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    taskEdit.getElement().querySelector(`.card__text`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, () => {
      this._boardTasks.getElement().replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._boardTasks.getElement(), task.getElement(), Position.BEFOREEND);
  }

  _onLoadMoreClick() {
    APP_SETTINGS.currentTasks = this._boardTasks.getElement().querySelectorAll(`.card`).length;
    if ((APP_SETTINGS.currentTasks + APP_SETTINGS.tasksToShow) >= this._taskMocks.length - 1) {
      this._taskMocks.slice((APP_SETTINGS.currentTasks), APP_SETTINGS.currentTasks + APP_SETTINGS.tasksToShow)
        .forEach((taskMock) => this._renderTask(taskMock));
      this._loadMore.removeElement(this._loadMore.getElement());
      return;
    }
    this._taskMocks.slice((APP_SETTINGS.currentTasks - 1), APP_SETTINGS.currentTasks + APP_SETTINGS.tasksToShow)
      .forEach((taskMock) => this._renderTask(taskMock));
  }
}
