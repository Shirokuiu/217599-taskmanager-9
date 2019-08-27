import Controller from "./controller";
import HeaderController from "./header";
import BoardController from "./board";

import {getTask, getFilter} from '../data';

export default class AppController extends Controller {
  constructor() {
    super();
    this._totalTasks = 16;
    this._tasksToShow = 8;
    this._loadTaskItems = 8;
    this._currentTasks = 0;
    this._taskMocks = this._makeTasksData(getTask);
    this._filterMocks = getFilter();
    this._headerController = new HeaderController(this._taskMocks, this._filterMocks);
    this._boardController = new BoardController(this._taskMocks, this.appInfo);
  }

  init() {
    this._headerController.init();
    this._boardController.init();
  }

  get appInfo() {
    return {
      totalTasks: this._totalTasks,
      tasksToShow: this._tasksToShow,
      loadTaskItems: this._loadTaskItems,
      currentTasks: this._currentTasks,
    };
  }

  _makeTasksData(createTask, count = this.appInfo.totalTasks) {
    let tasks = [];
    for (let i = 0, len = count; i < len; i++) {
      tasks.push(createTask());
    }
    return tasks;
  }
}
