import Component from "./component";

export default class Filters extends Component {
  constructor(filterMocks) {
    super();
    this._filterMocks = filterMocks;
  }

  getTemplate() {
    return `<section class="main__filter filter container">
        ${this._filterMocks.map(({title, count, checked}) => `<input
          type="radio"
          id="filter__all"
          class="filter__input visually-hidden"
          name="filter"
          ${checked ? `checked` : ``}
        />
        <label for="filter__all" class="filter__label">
          ${title} <span class="filter__all-count">${count}</span></label
        >`).join(``)}
    </section>`;
  }
}
