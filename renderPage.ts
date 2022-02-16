import { getWords, getUserLearnedWords } from '../js/api';
import { CardElement } from '../card/cardElement';
import { settings } from '../book/svg';
import { firstPage, currentPage, totalPages, prevPage, nextPage, changeLevel } from '../book/paginationBook';
import { difficultWord, removeDifficultWord } from './difficultPage';
import { pageUp } from './svg';
import { getItemFromLocalStorage } from '../js/localStorage';
import { learnedWord } from './learnedWords';
import { sprintIcon, callIcon } from '../book/svg';
import { myId } from '../card/cardElement';

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
  const myId: string = getItemFromLocalStorage('id');
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
  aside.appendChild(callButton);*/

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

  
  const learnedWords = await getUserLearnedWords(myId);
  const dataLearnedWords = learnedWords[0].paginatedResults;
  const data = await getWords(group, page);
  if (dataLearnedWords) {
  console.log(dataLearnedWords[0]._id, data[0].id)

   data.filter((a) => dataLearnedWords[0]._id?.indexOf(a.id)=== 1);
   console.log(data.filter((a) => dataLearnedWords[0]._id?.indexOf(a.id)=== 1)) }
  // var cache;
  // if (dataLearnedWords) {

  //   const ln1 = dataLearnedWords.length;
  //   const ln2 = data.length;
         
  //   for (let i = 0; i < ln1; i+=1) {
  //     cache = dataLearnedWords[i]._id;
  //     //console.log(cache)
  //     for (let j = 0; j < ln2; ++j) {
  //       //console.log(data[j].id)
  //       if (cache === data[j].id) {
          
  //         console.log('найдено совпадение: ' + cache);
  //         //break;
  //       }
  //     }
  //   }


  // }

  if (dataLearnedWords) 
   dataLearnedWords.forEach(async (item) => {
    const  id = item._id;
   
    
   //console.log(data);
   data.map((word) => {
    // console.log(word.id);
    const cardOnPage = new CardElement(word).renderCard();
    id === word.id ? cardOnPage.classList.add('opacity'):cardOnPage.classList.remove('opacity');
    if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
  })
  //   dataLearnedWords.map((word) => {
  //    const cardOnPage = new CardElement(data).renderCard();
  //    if (cardsOnPage){
  //    word._id === data.id ? cardOnPage.classList.add('opacity'):cardOnPage.classList.remove('opacity')
  //    cardOnPage.classList.add('opacity');
  //    if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);}
   })
//    )

// }
//}

  

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
    
    // const data = await getWords(group, page);
    // data.forEach((element) => {
    //   const cardOnPage = new CardElement(element).renderCard();
    //   if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
    // });
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
  //addModal();
  
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
