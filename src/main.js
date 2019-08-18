import {getMenu} from './components/menu';
import {getSearch} from './components/search';
import {getFilters} from './components/filters';
import {getContent} from './components/content';
import {getCard} from './components/card';
import {getCardEdit} from './components/card-edit';
import {getLoadMore} from './components/load-more';
import {getTask, getFilter} from './data';

const APP_SETTINGS = {
  totalTasks: 15,
  tasksToShow: 8,
  loadTaskItems: 8,
  currentTasks: 0,
}

const render = (container, component, place = `afterend`) => {
  container.insertAdjacentHTML(place, component);
};

const makeTasksData = (task, count) => {
  let tasks = [];
  
  for (let i = 0, len = count; i < len; i++) {
    tasks.push(task());
  }
  
  return tasks;
};

const getFiltersCount = () => {
  filters[0].count = tasks.length + 1;
  filters[1].count = tasks.filter(it => new Date(it.dueDate).toDateString().split(` `).slice(2, 3)[0] < new Date(Date.now()).toDateString().split(` `).slice(2, 3)[0]).length;
  filters[2].count = tasks.filter(it => new Date(it.dueDate).toDateString() === new Date(Date.now()).toDateString()).length;
  filters[3].count = tasks.filter(it => it.isFavorite).length;
  filters[4].count = tasks.filter(it => Object.keys(it.repeatingDays).some(day => it.repeatingDays[day])).length;
  filters[5].count = tasks.map(it => Array.from(it.tags).length).reduce((first, second) => first + second);
  filters[6].count = tasks.filter(it => it.isArchive).length;
};

const onLoadMoreClick = () => {
  APP_SETTINGS.currentTasks = document.querySelectorAll(`.card`).length;
  
  if ((APP_SETTINGS.currentTasks + APP_SETTINGS.tasksToShow) >= tasks.length - 1) {
    tasks.slice((APP_SETTINGS.currentTasks - 1), APP_SETTINGS.currentTasks + APP_SETTINGS.tasksToShow)
    .map(task => render(document.querySelector(`.board__tasks`), getCard(task), `beforeend`));
    
    return document.querySelector('.load-more').remove();
  }
  
  tasks.slice((APP_SETTINGS.currentTasks - 1), APP_SETTINGS.currentTasks + APP_SETTINGS.tasksToShow)
    .map(task => render(document.querySelector(`.board__tasks`), getCard(task), `beforeend`));
};

const tasks = makeTasksData(getTask, APP_SETTINGS.totalTasks);
const filters = getFilter();

getFiltersCount();
render(document.querySelector(`.main__control`), getMenu(), `beforeend`);
render(document.querySelector(`.main__control`), getSearch());
filters.reverse().map(filter => render(document.querySelector(`.main__filter`), getFilters(filter), `afterbegin`));
render(document.querySelector(`.main__filter`), getContent());
render(document.querySelector(`.board__tasks`), getLoadMore());

tasks.slice(0, (APP_SETTINGS.tasksToShow - 1)).map(task => render(document.querySelector(`.board__tasks`), getCard(task), `afterbegin`));
render(document.querySelector(`.board__tasks`), getCardEdit(), `afterbegin`);
document.querySelector('.load-more').addEventListener(`click`, onLoadMoreClick);

