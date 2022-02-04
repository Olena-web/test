import { AbstractView } from "./AbstractView";

export class Sprint extends AbstractView {
  constructor() {
    super();
    this.setTitle('Sprint');
  }

  async getHtml():Promise<string> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апп
    
    const footer = <HTMLElement>document.querySelector('.footer');
    footer.classList.add('hide');
    return `
    <div class="view sprint-view">
      <p>This is sprint game<p>
    </div>
    `;
  }

  async renderCard() {
    return `
    <div class="card sprint-card">
      <p>This is future card with words for sprint game</p>
    </div>
    `
  }
}