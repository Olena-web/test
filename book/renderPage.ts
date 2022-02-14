import { getWords } from '../js/api';
import { CardElement } from '../card/cardElement';
import { settings } from '../book/svg';
import {
  firstPage, currentPage, totalPages, prevPage, nextPage, changeLevel,
} from '../book/paginationBook';
import {
  difficultWord, removeDifficultWord, learnedWord,
} from './difficultPage';
import { pageUp } from './svg';
import { getItemFromLocalStorage } from '../js/localStorage';
import { addModal } from './settings';

export const Group = 0;

export function createAside() {
  const aside = document.createElement('aside');
  aside.classList.add('levels');
  aside.innerHTML = `
  <h2>Textbook</h2>
  <button class="settings">${settings}</button>
  <div id="level0" class="level level1">Chapter 1</div>
  <div id="level1" class="level level2">Chapter 2</div>
  <div id="level2" class="level level3">Chapter 3</div>
  <div id="level3" class="level level4">Chapter 4</div>
  <div id="level4" class="level level5">Chapter 5</div>
  <div id="level5" class="level level6">Chapter 6</div>
  <div id="modal" class="modal">
    <div class = modal-content>
      <button class="close-button">&times;</button>
      <div class="switch show-translation">
      <div class="switch-item show-translation"></div>
      <label>
        <span class="show-translation">show translation</span>
        <input
          type="checkbox"
          id="translate"
          class="btn-switch green tinyswitch translate"
          checked />
        <div><div></div></div
      ></label>
    </div>
    <div class="switch show-buttons">
      <div class="switch-item"></div>
      <label>
        <span >show button for words</span>
        <input
          type="checkbox"
          id="difficult"
          class="btn-switch green tinyswitch translate"
          checked />
        <div><div></div></div
      ></label>
    </div>
      <button id="save" class="save">save</button>
    </div>
  </div>
 `;
  const difficultLevel = document.createElement('div');
  difficultLevel.classList.add('level');
  difficultLevel.classList.add('level7');
  difficultLevel.setAttribute('id', 'level6');
  difficultLevel.innerHTML = 'Difficult words';
  difficultLevel.classList.add('hide');
  aside.appendChild(difficultLevel);
  const myId: string = getItemFromLocalStorage('id');
  if (myId) {
    difficultLevel.classList.remove('hide');
  }

  return aside;
}

export async function renderPage(group: number, page: number) : Promise<HTMLElement> {
  const wrapperBook = document.createElement('div');
  wrapperBook.classList.add('wrapper-book');

  const Page = document.createElement('section');
  Page.classList.add('book');

  const prevButton = document.createElement('button');
  prevButton.setAttribute('id', 'prev');
  prevButton.innerText = 'prev';

  const nextButton = document.createElement('button');
  nextButton.setAttribute('id', 'next');
  nextButton.innerText = 'next';

  nextButton.setAttribute('data-state', currentPage === 0 ? 'disabled' : '');
  prevButton.setAttribute('data-state', currentPage === totalPages ? 'disabled' : '');

  const counter = document.createElement('span');
  counter.classList.add('counter');
  counter.innerHTML = `${currentPage + 1} / ${totalPages}`;
  const paginationBtn = document.createElement('div');
  paginationBtn.classList.add('pagination');
  paginationBtn.setAttribute('id', 'up');

  Page.appendChild(paginationBtn);

  paginationBtn.appendChild(prevButton);
  paginationBtn.appendChild(counter);
  paginationBtn.appendChild(nextButton);

  const up = document.createElement('div');
  up.classList.add('pageup');
  up.innerHTML = `${pageUp}`;
  Page.appendChild(up);

  const cardsOnPage = document.createElement('div');
  cardsOnPage.classList.add('book-page');

  Page.appendChild(cardsOnPage);

  wrapperBook.appendChild(Page);

  

  document.addEventListener('onload', async ()=>{
    //getItemFromLocalStorage('currentPage');
    if (getItemFromLocalStorage('currentPage')){
    const currentPageUser = getItemFromLocalStorage('currentPage');
    const userLevel = +currentPageUser.charAt(1);
    const userPage = +currentPageUser.charAt(3)
    if (currentPageUser){
      renderPage(userLevel, userPage)}
  }}
  )
    
    const data = await getWords(group, page);
    data.forEach((element) => {
      const cardOnPage = new CardElement(element).renderCard();
      if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
    });
  function changePages() {
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (currentPage === 0) {
          prevButton.classList.add('opacity');
        } else if (currentPage > 0) {
          prevButton.classList.remove('opacity');
        }
        prevPage();
        counter.innerHTML = `${currentPage + 1} / ${totalPages}`;
      });
    }
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        prevButton.classList.remove('opacity');
        if (currentPage === totalPages) {
          nextButton.classList.add('opacity');
        } else {
          nextButton.classList.remove('opacity');
        }
        counter.innerHTML = `${currentPage + 2} / ${totalPages}`;
        nextPage();
      });
    }
  }
  changeLevel();
  changePages();
  addModal();
  
  document.body.addEventListener('click', (e) => {
    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('level')) {
        if (counter) {
          counter.innerHTML = '';
          counter.innerHTML = `${firstPage + 1} / ${totalPages}`;
        }
      }
    }
  });

  learnedWord();
  difficultWord();
  removeDifficultWord();

  return wrapperBook;
}


const currentPageUser = getItemFromLocalStorage('currentPage');
const userLevel = currentPageUser.charAt(1);
const userPage = currentPageUser.charAt(3)


// "620262a55dbb20001613405b"
