import {makeMenu} from './components/menu';
import {makeSearch} from './components/search';
import {makeFilter} from './components/filters';
import {makeContent} from './components/content';
import {makeCard} from './components/card';
import {makeCardEdit} from './components/card-edit';
import {makeLoadMore} from './components/load-more';
import {getTask, getFilter} from './data';

const APP_SETTINGS = {
  totalTasks: 15,
  tasksToShow: 8,
  loadTaskItems: 8,
  currentTasks: 0,
};

const render = (container, component, place = `afterend`) => {
  container.insertAdjacentHTML(place, component);
};

const makeTasksData = (createTask, count) => {
  let tasks = [];
  for (let i = 0, len = count; i < len; i++) {
    tasks.push(createTask());
  }
  return tasks;
};

const getFiltersCount = () => {
  filters[0].count = tasks.length + 1;
  filters[1].count = tasks.filter((it) => new Date(it.dueDate).toDateString().split(` `).slice(2, 3)[0] < new Date(Date.now()).toDateString().split(` `).slice(2, 3)[0]).length;
  filters[2].count = tasks.filter((it) => new Date(it.dueDate).toDateString() === new Date(Date.now()).toDateString()).length;
  filters[3].count = tasks.filter((it) => it.isFavorite).length;
  filters[4].count = tasks.filter((it) => Object.keys(it.repeatingDays).some((day) => it.repeatingDays[day])).length;
  filters[5].count = tasks.filter((it) => Array.from(it.tags).length).length;
  filters[6].count = tasks.filter((it) => it.isArchive).length;
};

const showMore = () => {
  APP_SETTINGS.currentTasks = document.querySelectorAll(`.card`).length;
  if ((APP_SETTINGS.currentTasks + APP_SETTINGS.tasksToShow) >= tasks.length - 1) {
    tasks.slice((APP_SETTINGS.currentTasks - 1), APP_SETTINGS.currentTasks + APP_SETTINGS.tasksToShow)
    .forEach((task) => render(document.querySelector(`.board__tasks`), makeCard(task), `beforeend`));
    document.querySelector(`.load-more`).remove();
    return;
  }
  tasks.slice((APP_SETTINGS.currentTasks - 1), APP_SETTINGS.currentTasks + APP_SETTINGS.tasksToShow)
    .forEach((task) => render(document.querySelector(`.board__tasks`), makeCard(task), `beforeend`));
};

const tasks = makeTasksData(getTask, APP_SETTINGS.totalTasks);
const filters = getFilter();

getFiltersCount();
render(document.querySelector(`.main__control`), makeMenu(), `beforeend`);
render(document.querySelector(`.main__control`), makeSearch());
filters.reverse().forEach((filter) => render(document.querySelector(`.main__filter`), makeFilter(filter), `afterbegin`));
render(document.querySelector(`.main__filter`), makeContent());
render(document.querySelector(`.board__tasks`), makeLoadMore());

tasks.slice(0, (APP_SETTINGS.tasksToShow - 1)).forEach((task) => render(document.querySelector(`.board__tasks`), makeCard(task), `afterbegin`));
render(document.querySelector(`.board__tasks`), makeCardEdit(), `afterbegin`);
document.querySelector(`.load-more`).addEventListener(`click`, showMore);

