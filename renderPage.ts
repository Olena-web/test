import { getWords, getUserWordsAll } from '../js/api';
import { CardElement } from '../card/cardElement';
import { settings } from '../book/svg';
import {
  firstPage, currentPage, totalPages, prevPage, nextPage, changeLevel,
} from '../book/paginationBook';
import {
  removeCard, difficultWord, removeDifficultWord, myId,
} from './difficultPage';
import { toggleTranslate, toggleButtons } from '../book/settings';

export const Group = 0;

export async function renderPage(group: number, page: number) : Promise<HTMLElement> {
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

  Page.appendChild(paginationBtn);

  paginationBtn.appendChild(prevButton);
  paginationBtn.appendChild(counter);
  paginationBtn.appendChild(nextButton);

  const cardsOnPage = document.createElement('div');
  cardsOnPage.classList.add('book-page');
  Page.appendChild(cardsOnPage);
  const data = await getWords(group, page);
  const diffWordsId = await getUserWordsAll(myId);
  for (let i = 0; i < diffWordsId.length; i += 1) {
    data.forEach((element) => {
      const idToStyle = diffWordsId[i].wordId;
      const cardOnPage = new CardElement(element).renderCard();
      if (idToStyle === element.id) cardOnPage.classList.add('difficult-word');

      if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
      if (idToStyle === element.id && !cardOnPage.classList.contains('difficult-word'))cardOnPage.remove();
    });
  }
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
  removeCard();
  difficultWord();
  removeDifficultWord();

  return Page;
}

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
  <div id="level6" class="level level7">Difficult words</div>
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
  return aside;
}
