import {getMenu} from './components/menu';
import {getSearch} from './components/search';
import {getFilters} from './components/filters';
import {getContent} from './components/content';
import {getCard} from './components/card';
import {getCardEdit} from './components/card-edit';
import {getLoadMore} from './components/load-more';

const CARD_COLORS = [`black`, `blue`, `yellow`];

const render = (container, component, place = `afterend`) => {
  container.insertAdjacentHTML(place, component);
};

render(document.querySelector(`.main__control`), getMenu(), `beforeend`);
render(document.querySelector(`.main__control`), getSearch());
render(document.querySelector(`.main__search`), getFilters());
render(document.querySelector(`.main__filter`), getContent());
render(document.querySelector(`.board__tasks`), getLoadMore());

CARD_COLORS.map((color) => render(document.querySelector(`.board__tasks`), getCard(color), `afterbegin`));

render(document.querySelector(`.board__tasks`), getCardEdit(), `afterbegin`);

