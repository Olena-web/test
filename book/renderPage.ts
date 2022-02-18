/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import {
  getWords, getUserLearnedWords, getUserDifficultWords, getUserLearnDiffWords,
} from '../js/api';
import { CardElement, myId } from '../card/cardElement';
import { settings, sprintIcon, callIcon } from '../book/svg';
import {
  firstPage, currentPage, totalPages, prevPage, nextPage, changeLevel,
} from '../book/paginationBook';
import { difficultWord, removeDifficultWord } from './difficultPage';
import { pageUp } from './svg';
import { getItemFromLocalStorage } from '../js/localStorage';
import { learnedWord } from './learnedWords';

export const Group = 0;

export function createAside() {
  const aside = document.createElement('aside');
  aside.classList.add('levels');
  aside.innerHTML = `
  <h2>Textbook</h2>
  <button class="settings" title="Настройки">${settings}</button>
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
  if (myId) {
    difficultLevel.classList.remove('hide');
  }

  const sprintButton = document.createElement('button');
  sprintButton.setAttribute('title', 'Игра Спринт');
  sprintButton.classList.add('sprint-btn');
  sprintButton.classList.add('userSprint');
  sprintButton.setAttribute('id', 'sprint');
  sprintButton.innerHTML = `${sprintIcon}`;
  aside.appendChild(sprintButton);

  /* const callButton = document.createElement('button');
  callButton.classList.add('call-btn');
  callButton.setAttribute('id', 'call');
  callButton.innerHTML = `${callIcon}`;
  aside.appendChild(callButton); */

  /**/
  const callButton = document.createElement('div');
  callButton.classList.add('userAudioCall');
  callButton.innerHTML = `<a href="#/audiocall-user/" data-href="#/audiocall-user/" title="Игра Аудиовызов">${callIcon}</a>`;
  aside.appendChild(callButton);

  return aside;
}

export async function renderPage(group: number, page: number): Promise<HTMLElement> {
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

  

  const data = await getWords(group, page);
  data.forEach((element) => {
    const cardOnPage = new CardElement(element).renderCard();
    if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
    return cardsOnPage;
  });
  // TODO : for logined user we need to style difficult and learned words
  // we have arrays with all data, learned words and difficult words

  // if (myId) {
  //   data.forEach((element) => {
  //     const cardOnPage = new CardElement(element).renderCard();
  //     if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
  //     return cardsOnPage;
  //   });
  //   // from 148 till 185 doesn't work correctly

  //   const difficultWords = await getUserDifficultWords(myId);
  //   const dataDifficultWords = difficultWords[0].paginatedResults;

  //   const learnedWords = await getUserLearnedWords(myId);
  //   const dataLearnedWords = learnedWords[0].paginatedResults;

  //   const lernAndDifficult = await getUserLearnDiffWords(myId);
  //   const dataLearAndDifficult = lernAndDifficult[0].paginatedResults;
  //   const filterAllToStyle = data.filter((e) => dataLearAndDifficult?.findIndex((i) => i._id !== e.id));
  //   console.log(filterAllToStyle[0].id, data[0].id);

  //   // for (let i = 0; i < filterAllToStyle.length; i += 1) {
  //   //   const hash = filterAllToStyle[i].id;
  //   //   for (let j = 0; j < data.length; ++j) {
  //   //     if (hash === data[j].id) {
  //   //       console.log(`found id = ${data[j].id}`);
  //   //       const cardOnPage = new CardElement(data[j]).renderCard();
  //   //       if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
  //   //       cardOnPage.classList.add('difficult-word');
  //   //       return cardsOnPage;
  //   //     }

  //   //     data.forEach((element) => {
  //   //       const cardOnPage = new CardElement(element).renderCard();
  //   //       if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
  //   //     });
  //   //   }
  //   //   return cardsOnPage;
  //   // }

  //   //   const filterLearned = data.filter((e) => dataLearnedWords?.findIndex((i) => i._id !== e.id));
  //   //   const filterDifficult = data.filter((e) => dataDifficultWords?.findIndex((i) => i._id !== e.id));
  //   //   const filterNonLearned = data.filter((e) => dataLearnedWords?.findIndex((i) => i._id === e.id));
  //   //   const filterNonDifficult = data.filter((e) => dataDifficultWords?.findIndex((i) => i._id === e.id));

  //   //   filterDifficult.forEach((card) => {
  //   //     const cardOnPage = new CardElement(card).renderCard();
  //   //     if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
  //   //     cardOnPage.classList.add('difficult-word');
  //   //     return cardsOnPage;
  //   //   });

  // //   filterLearned.forEach((card) => {
  // //     const cardOnPage = new CardElement(card).renderCard();
  // //     if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
  // //     cardOnPage.classList.add('opacity');
  // //     return cardsOnPage;
  // //   });
  // //   filterNonDifficult.forEach((card) => {
  // //     const cardOnPage = new CardElement(card).renderCard();
  // //     if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
  // //     return cardsOnPage;
  // //   });
  // // } else {
  // //   data.forEach((element) => {
  // //     const cardOnPage = new CardElement(element).renderCard();
  // //     if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
  // //   });
  // }

  document.addEventListener('onload', async () => {
    if (getItemFromLocalStorage('currentPage')) {
      const currentPageUser = getItemFromLocalStorage('currentPage');
      const userLevel = +currentPageUser.charAt(1);
      const userPage = +currentPageUser.charAt(3);
      if (currentPageUser) {
        renderPage(userLevel, userPage);
      }
    }
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
  // addModal();

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