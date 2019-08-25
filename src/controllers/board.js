import Board from "../components/board";
import BoardTasks from "../components/board-tasks";
import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import Sort from "../components/sort";
import LoadMore from "../components/load-more";
import NoTask from "../components/no-task";

import {render} from "../utils";

export default class BoardController {
  constructor(container, taskMocks, appInfo) {
    this._container = container;
    this._taskMocks = taskMocks;
    this._appInfo = appInfo;
    this._board = new Board();
    this._boardTasks = new BoardTasks();
    this._sort = new Sort();
    this._loadMore = new LoadMore();
    this._noTask = new NoTask();
  }

  init() {
    render(this._container, this._board.getElement());

    this._shouldRenderTask(this._taskMocks, () => {
      render(this._board.getElement(), this._sort.getElement());
      render(this._board.getElement(), this._boardTasks.getElement());
      this._taskMocks.slice(0, this._appInfo.tasksToShow).forEach((taskMock) => this._renderTask(taskMock));
      render(this._board.getElement(), this._loadMore.getElement());
      this._loadMore.getElement().addEventListener(`click`, this._onLoadMoreClick.bind(this));

      this._sort.getElement().addEventListener(`click`, this._onSortClick.bind(this));
    }, () => {
      render(this._board.getElement(), this._noTask.getElement());
    });
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
    render(this._boardTasks.getElement(), task.getElement());
  }

  _onLoadMoreClick() {
    this._appInfo.currentTasks = this._boardTasks.getElement().querySelectorAll(`.card`).length;
    if ((this._appInfo.currentTasks + this._appInfo.tasksToShow) >= this._taskMocks.length - 1) {
      this._taskMocks.slice((this._appInfo.currentTasks), this._appInfo.currentTasks + this._appInfo.tasksToShow)
        .forEach((taskMock) => this._renderTask(taskMock));
      this._loadMore.removeElement(this._loadMore.getElement());
      return;
    }
    this._taskMocks.slice((this._appInfo.currentTasks - 1), this._appInfo.currentTasks + this._appInfo.tasksToShow)
      .forEach((taskMock) => this._renderTask(taskMock));
  }

  _shouldRenderTask(taskMocks, renderTasks, renderNoTasks) {
    const tasksInArchive = taskMocks.filter((task) => task.isArchive);

    if (taskMocks.length || taskMocks.length === tasksInArchive) {
      renderTasks();
      return;
    }
    renderNoTasks();
  }

  _onSortClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName.toLocaleLowerCase() !== `a`) {
      return;
    }

    this._boardTasks.getElement().innerHTML = ``;

    switch (evt.target.dataset.sort) {
      case `default`:
        this._taskMocks.slice(0, this._appInfo.tasksToShow).forEach((task) => this._renderTask(task));
        break;
      case `dateUp`:
        this._taskMocks.slice(0, this._appInfo.tasksToShow)
          .sort((a, b) => a.dueDate - b.dueDate).forEach((task) => this._renderTask(task));
        break;
      case `dateDown`:
        this._taskMocks.slice(0, this._appInfo.tasksToShow)
          .sort((a, b) => b.dueDate - a.dueDate).forEach((task) => this._renderTask(task));
    }
  }
}
