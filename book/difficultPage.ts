/* eslint-disable no-inner-declarations */
import { setItemToLocalStorage, getItemFromLocalStorage } from '../js/localStorage';

import {
  getWord, createUserWord, getUserWord, getUserWordsAll, deleteUserWord, getUserDifficultWords,
} from '../js/api';
import { CardElement } from '../card/cardElement';
import { UserWordParameters } from '../js/types';
import { WORDS_PER_PAGE, NUMBER_DIFFERENT_GROUP } from '../js/constants';

export const deletedCards: Array<string> = [];
export const difficultWords: Array<string> = [];

export const myId: string = getItemFromLocalStorage('id');
const deleteBtn = document.querySelector<HTMLButtonElement>('delete');
const prevButton = document.querySelector<HTMLButtonElement>('prev');
const nextButton = document.querySelector<HTMLButtonElement>('next');
const counter = document.querySelector<HTMLDivElement>('.counter');
const difficultGroup = NUMBER_DIFFERENT_GROUP;
const ifDifficultGroup = true;

const currentDifficultPage = 0;

export function removeCard() {
  document.body.addEventListener('click', (e) => {
    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('delete')) {
        const id = (e.target as HTMLElement).id.split('delete')[1];
        const cardToDelete = document.getElementById(`${id}`);
        deletedCards.push(id);
        setItemToLocalStorage('deletedCards', JSON.stringify(deletedCards));
        // if (cardToDelete) cardToDelete.remove();
      }
    }
  });
}

export function difficultWord() {
  document.body.addEventListener('click', async (e):Promise< void> => {
    if (e.target) {
      if ((<HTMLButtonElement>e.target).classList.contains('difficult')) {
        const wordId = (<HTMLButtonElement>e.target).id.split('difficult')[1];
        const word = document.getElementById(`${wordId}`);
        // const deleteBtnId = (<HTMLButtonElement>deleteBtn).id.split('delete')[1];
        if (word) word.classList.add('difficult-word');
        (<HTMLButtonElement>e.target).disabled = true;
        // if (deleteBtn && deleteBtnId === wordId) deleteBtn.disabled = true;
        (<HTMLButtonElement>e.target).classList.add('opacity');
        difficultWords.push(wordId);
        setItemToLocalStorage('difficultWords', JSON.stringify(difficultWords));
        const body: UserWordParameters = {
          difficulty: 'difficult-word',
          // optional: {  },
        };
        await deleteUserWord(myId, wordId);
        await createUserWord(myId, wordId, body);
      }
    }
  });
}

export async function removeDifficultWord() {
  document.body.addEventListener('click', async (e) => {
    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('delete')) {
        const id = (e.target as HTMLElement).id.split('delete')[1];
        deletedCards.push(id);
        await deleteUserWord(myId, id);
        if (ifDifficultGroup) {
          const cardToDelete = document.getElementById(`${id}`);
          // if (cardToDelete) cardToDelete.remove();
        }
      }
    }
  });
}

export async function renderDifficultPage() {
  document.body.addEventListener('click', async (e) => {
    const cardsOnPage = document.querySelector('.book-page');
    const pagination = document.querySelector('.pagination');
    if (e.target) {
      const id = (e.target as HTMLElement).id.split('level')[1];
      if (id === difficultGroup.toString()) {
        if (cardsOnPage) cardsOnPage.innerHTML = '';
        const diffWordsId = await getUserDifficultWords(myId);
        const diffWords = diffWordsId[0].paginatedResults;
        // const count = diffWordsId[0].totalCount[0];
        // const numberWords = Object.values(Object.values(count))[0];
        // const totalDifficultPages = Math.round(numberWords / WORDS_PER_PAGE);
        pagination?.classList.toggle('hide');

        if (diffWords) {
          diffWords.forEach(async (item) => {
            const cardOnPage = new CardElement(item).renderCard();
            const difficultBtn = document.querySelectorAll('difficult');
            difficultBtn.forEach((btn) => {
              console.log(btn);
              (<HTMLButtonElement>btn).disabled = true;

            })
            if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
          });
        }
        const difficultBtn = document.querySelectorAll('difficult');
        difficultBtn.forEach((btn) => {
          btn.classList.add('hide');
        });
        // async function nextDifficultPage() {
        //   if (currentDifficultPage < totalDifficultPages) {
        //     currentDifficultPage += 1;
        //     if (cardsOnPage) {
        //       cardsOnPage.innerHTML = '';
        //       localStorage.removeItem('currentPage');
        // eslint-disable-next-line max-len
        //       setItemToLocalStorage('currentPage', JSON.stringify(`${difficultGroup}-${currentDifficultPage}`));
        //     }
        //     if (diffWords) {
        //       diffWords.splice(0, 19);
        //       diffWords.forEach(async (item) => {
        //         console.log(item);
        //         // const difficultBtn = document.querySelector('difficult');
        //         const cardOnPage = new CardElement(item).renderCard();
        //         if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
        //         return cardsOnPage;
        //       });
        //     }
        //   }
        // }
        // function changeDifficultPages() {
        //   if (difficultGroup) {
        //     if (prevButton) {
        //       prevButton.addEventListener('click', () => {
        //         if (currentDifficultPage === 0) {
        //           prevButton.classList.add('opacity');
        //         } else if (currentDifficultPage > 0) {
        //           prevButton.classList.remove('opacity');
        //         }
        //         // prevPage();
        //         if (counter) counter.innerHTML = `${currentDifficultPage + 1} / ${totalDifficultPages}`;
        //       });
        //     }
        //     if (nextButton && prevButton) {
        //       nextButton.addEventListener('click', () => {
        //         console.log('click');
        //         prevButton.classList.remove('opacity');
        //         if (currentDifficultPage === totalDifficultPages) {
        //           nextButton.classList.add('opacity');
        //         } else {
        //           nextButton.classList.remove('opacity');
        //         }
        //         if (counter) counter.innerHTML = `${currentDifficultPage + 2} / ${totalDifficultPages}`;
        //         nextDifficultPage();
        //       });
        //     }
        //   }
        // }
        // changeDifficultPages();
      }
    }
  });
}

// function changeDifficultPages() {
//   if (prevButton) {
//     prevButton.addEventListener('click', () => {
//       if (currentDifficultPage === 0) {
//         prevButton.classList.add('opacity');
//       } else if (currentDifficultPage > 0) {
//         prevButton.classList.remove('opacity');
//       }
//       prevPage();
//       counter.innerHTML = `${currentDifficultPage + 1} / ${totalDifficultPages}`;
//     });
//   }
//   if (nextButton && prevButton) {
//     nextButton.addEventListener('click', () => {
//       prevButton.classList.remove('opacity');
//       if (currentDifficultPage === totalDifficultPages) {
//         nextButton.classList.add('opacity');
//       } else {
//         nextButton.classList.remove('opacity');
//       }
//       counter.innerHTML = `${currentDifficultPage + 2} / ${totalDifficultPages}`;
//       nextPage();
//     });
//   }
// }

export default {
  removeCard, difficultWord, renderDifficultPage,
};