import Component from "./component";

export default class Sort extends Component {
  getTemplate() {
    return `<div class="board__filter-list">
          <a href="#" class="board__filter" data-sort="default">SORT BY DEFAULT</a>
          <a href="#" class="board__filter" data-sort="dateUp">SORT BY DATE up</a>
          <a href="#" class="board__filter" data-sort="dateDown">SORT BY DATE down</a>
        </div>`;
  }
}
