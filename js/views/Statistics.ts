import { AbstractView } from "./AbstractView";

export class Statistics extends AbstractView {
  constructor() {
    super();
    this.setTitle('Statistics');
  }

  async getHtml():Promise<string> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апой

    const footer = <HTMLElement>document.querySelector('.footer');    
    if (footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }
    
    return `
    <div class="view statistics-view">
      <p>Statistics of the user will be added<p>
    </div>
    `;
  }
}