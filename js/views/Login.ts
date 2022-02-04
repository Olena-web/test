import { AbstractView } from "./AbstractView";

export class Login extends AbstractView {
  constructor() {
    super();
    this.setTitle('Login');
  }

  async getHtml():Promise<string> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апой

    const footer = <HTMLElement>document.querySelector('.footer');    
    footer.classList.remove('hide');

    return `
    <div class="view login-view">
      <p>Authentication of user will be added<p>
    </div>
    `;
  }
}