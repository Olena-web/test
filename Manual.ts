import { AbstractView } from "./AbstractView";

export class Manual extends AbstractView {
  constructor() {
    super();
    this.setTitle('Manual');
  }

  getHtml() {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апой

    const footer = <HTMLElement>document.querySelector('.footer');    
    if (footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }
    
    return `
    <div class="view manual-view">
      <p>Manual with words will be added<p>
    </div>
    `;
  }
}