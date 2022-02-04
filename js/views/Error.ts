import { AbstractView } from "./AbstractView";

export class Error extends AbstractView {
  constructor() {
    super();
    this.setTitle('Error - page does not exist');
  }


  async getHtml(): Promise<string> {
    return `<p>404 Page does not exist</a>`;
  }
}