import { AbstractView } from "./AbstractView";
import { Word } from '../types';
import { getWords } from "../api";
const page = 1;
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
    const manual = document.querySelector<HTMLElement>('.manual')

    const manualView = async(): Promise<string | undefined>=>{
      await getWords(page).then((data: Word[]) => {
         data.forEach((item) => {
          const { word, textExample, textMeaning } = item;
          if (manual) manual.innerHTML += `
          <p>${word}<p>`
    }); 
  }).catch((err) =>{
    throw err;
  })
  if (manual) return manual.innerHTML;
  }
 manualView();

return '';
    // return `
    // <div class="view manual-view">
    //   <p>Manual with words will be added<p>
      
    // </div>
    // `;
  }
}