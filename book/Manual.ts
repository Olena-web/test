import { AbstractView } from '../js/views/AbstractView';
import { renderPage, createAside, Group } from './renderPage';
import { currentPage } from './paginationBook';
import { addModal, toggleTranslate, toggleButtons } from './settings';
import { renderDifficultPage } from './difficultPage';
import { getItemFromLocalStorage } from '../js/localStorage';


export class Manual extends AbstractView {
  constructor() {
    super();
  }

  async getHtml(): Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');
    const footer = <HTMLElement>document.querySelector('.footer');
    if (footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }
    const aside = createAside();
    app.appendChild(aside);
    addModal();
    toggleTranslate();
    toggleButtons();
    renderDifficultPage();
    const currentPageUser = getItemFromLocalStorage('currentPage');
    const userLevel = +currentPageUser.charAt(1);
    const userPage = +currentPageUser.charAt(3)
    document.addEventListener('onload', async ()=>{
      //getItemFromLocalStorage('currentPage');
      if (getItemFromLocalStorage('currentPage')){
      
      if (currentPageUser){
        renderPage(userLevel, userPage)}
    } else {
      return renderPage(Group, currentPage);

    }
  
  })

    return renderPage(userLevel, userPage);
  }
}
export default Manual;
