import Menu from './components/menu';
import Search from './components/search';
import Filters from './components/filters';
import NoTask from './components/no-task';
import BoardController from "./controllers/board";

import {getTask, getFilter} from './data';
import {render, Position, APP_SETTINGS} from './utils';

const renderMenu = () => {
  const menu = new Menu();

  render(document.querySelector(`.main__control`), menu.getElement(), Position.BEFOREEND);
};

const renderSearch = () => {
  const search = new Search();

  render(document.querySelector(`.main`), search.getElement(), Position.BEFOREEND);
};

const renderFilters = (filterMocks) => {
  const filters = new Filters(filterMocks);

  render(document.querySelector(`.main`), filters.getElement(), Position.BEFOREEND);
};

const renderNoTask = () => {
  const noTask = new NoTask();

  render(document.querySelector(`.board`), noTask.getElement(), Position.BEFOREEND);
};

const makeTasksData = (createTask, count) => {
  let tasks = [];
  for (let i = 0, len = count; i < len; i++) {
    tasks.push(createTask());
  }
  return tasks;
};

const shouldRenderTask = (taskMocks, renderTasks, renderNoTasks) => {
  const tasksInArchive = taskMocks.filter((task) => task.isArchive);

  if (taskMocks.length || taskMocks.length === tasksInArchive) {
    renderTasks();
    return;
  }
  renderNoTasks();
};

const getFiltersCount = () => {
  filters[0].count = tasks.length;
  filters[1].count = tasks.filter((it) => new Date(it.dueDate).toDateString().split(` `).slice(2, 3)[0] < new Date(Date.now()).toDateString().split(` `).slice(2, 3)[0]).length;
  filters[2].count = tasks.filter((it) => new Date(it.dueDate).toDateString() === new Date(Date.now()).toDateString()).length;
  filters[3].count = tasks.filter((it) => it.isFavorite).length;
  filters[4].count = tasks.filter((it) => Object.keys(it.repeatingDays).some((day) => it.repeatingDays[day])).length;
  filters[5].count = tasks.filter((it) => Array.from(it.tags).length).length;
  filters[6].count = tasks.filter((it) => it.isArchive).length;
};

const tasks = makeTasksData(getTask, APP_SETTINGS.totalTasks);
const filters = getFilter();
const boardController = new BoardController(document.querySelector(`.main`), tasks);

getFiltersCount();
renderMenu();
renderSearch();
renderFilters(filters);

shouldRenderTask(tasks, () => {
  boardController.init();
}, () => {
  renderNoTask();
});
