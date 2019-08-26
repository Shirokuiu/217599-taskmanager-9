import Controller from "./controller";

import Menu from "../components/menu";
import Search from "../components/search";
import Filters from "../components/filters";

import {render} from '../utils';

export default class HeaderController extends Controller {
  constructor(taskMocks, filterMocks) {
    super();
    this.container = document.querySelector(`.main`);
    this._taskMocks = taskMocks;
    this._filterMocks = this._getFiltersCount(filterMocks, this._taskMocks);
    this._menu = new Menu();
    this._search = new Search();
    this._filters = new Filters(this._filterMocks);
  }

  init() {
    render(this.container.querySelector(`.main__control`), this._menu.getElement());
    render(this.container, this._search.getElement());
    render(this.container, this._filters.getElement());
  }

  _getFiltersCount(filterMocks, taskMocks) {
    if (taskMocks.length) {
      filterMocks[0].count = taskMocks.length;
      filterMocks[1].count = taskMocks.filter((it) => new Date(it.dueDate).toDateString().split(` `)
        .slice(2, 3)[0] < new Date(Date.now()).toDateString().split(` `).slice(2, 3)[0]).length;
      filterMocks[2].count = taskMocks.filter((it) => new Date(it.dueDate)
        .toDateString() === new Date(Date.now()).toDateString()).length;
      filterMocks[3].count = taskMocks.filter((it) => it.isFavorite).length;
      filterMocks[4].count = taskMocks.filter((it) => Object.keys(it.repeatingDays).some((day) => it.repeatingDays[day])).length;
      filterMocks[5].count = taskMocks.filter((it) => Array.from(it.tags).length).length;
      filterMocks[6].count = taskMocks.filter((it) => it.isArchive).length;
      return filterMocks;
    }
    return filterMocks;
  }
}
