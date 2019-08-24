import Component from "./component";

export default class NoTask extends Component {
  getTemplate() {
    return `<p class="board__no-tasks">
          Congratulations, all tasks were completed! To create a new click on
          «add new task» button.
        </p>`;
  }
}
