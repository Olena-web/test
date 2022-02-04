import { AbstractView } from "./AbstractView";
import { Word } from '../types';
import { getWords } from "../api";
import { renderWord } from "../../card/renderOne";
import { renderPage } from "../../book/renderPage";

export class Manual extends AbstractView {
  constructor() {
    super();
    this.setTitle('Manual');
  }

  async getHtml():Promise<string> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апой

    const footer = <HTMLElement>document.querySelector('.footer');    
    if (footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }
    //const manual = document.querySelector<HTMLElement>('.book')
    return (await renderPage(0, 3)).outerHTML;
    // const manualView = async(): Promise<string> {
//       await getWords(page).then((data: Word[]) => {
//          data.forEach((item) => {
//           const { word, textExample, textMeaning } = item;
//           if (manual) manual.innerHTML += `
//           <p>${word}<p>`
//     }); 
//   }).catch((err) =>{
//     throw err;
//   })
//   if (manual) return manual.innerHTML;
//   }
//  manualView();

return '';
    // return `
    // <div class="view manual-view">
    //   <p>Manual with words will be added<p>
      
    // </div>
    // `;
  }
}