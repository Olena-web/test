import { AbstractView } from "./AbstractView";
import { renderWord } from "../../card/renderOne";

export class Audiocall extends AbstractView {
  constructor() {
    super();
    this.setTitle('Audiocall');
  }

  async getHtml(): Promise<string> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апп
    
    const footer = <HTMLElement>document.querySelector('.footer');
    footer.classList.add('hide');  
    
    return (await renderWord("5e9f5ee35eb9e72bc21af4a4")).outerHTML;//пока цель получить 1 полную карточку по id
  }

   
  /*async renderCard() {
    return `
    <div class="card audiocall-card">
      <p>This is future card with audiocall words</p>
    </div>
    `
  }*/
}

//"id": "5e9f5ee35eb9e72bc21af4a4",