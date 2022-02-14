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
export const learnedWords: Array<string> = [];

export const myId: string = getItemFromLocalStorage('id');
const deleteBtn = document.querySelector<HTMLButtonElement>('delete');
const prevButton = document.querySelector<HTMLButtonElement>('prev');
const nextButton = document.querySelector<HTMLButtonElement>('next');
const counter = document.querySelector<HTMLDivElement>('.counter');
const difficultGroup = NUMBER_DIFFERENT_GROUP;
let ifDifficultGroup = true;

let currentDifficultPage = 0;

export function removeCard() {
  document.body.addEventListener('click', (e) => {
    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('delete')) {
        const id = (e.target as HTMLElement).id.split('delete')[1];
        const cardToDelete = document.getElementById(`${id}`);
        deletedCards.push(id);
        setItemToLocalStorage('deletedCards', JSON.stringify(deletedCards));
        if (cardToDelete) cardToDelete.remove();
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
          optional: { testFieldString: 'test', testFieldBoolean: true },
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
          if (cardToDelete) cardToDelete.remove();
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
        const count = diffWordsId[0].totalCount[0];
        const numberWords = Object.values(Object.values(count))[0];
        const totalDifficultPages = Math.round(numberWords / WORDS_PER_PAGE);

        if (diffWords) {
          diffWords.forEach(async (item) => {
            const cardOnPage = new CardElement(item).renderCard();
            if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
            const difficultBtn = document.querySelector<HTMLButtonElement>('difficult');
            if (difficultBtn) difficultBtn.disabled = true;
          });
        }

        // async function nextDifficultPage() {
        //   if (currentDifficultPage < totalDifficultPages) {
        //     currentDifficultPage += 1;
        //     if (cardsOnPage) {
        //       cardsOnPage.innerHTML = '';
        //       localStorage.removeItem('currentPage');
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
export function learnedWord() {
  document.body.addEventListener('click', async (e):Promise< void> => {
    if (e.target) {
      if ((<HTMLButtonElement>e.target).classList.contains('delete')) {
        const wordId = (<HTMLButtonElement>e.target).id.split('delete')[1];
        const word = document.getElementById(`${wordId}`);
        console.log(wordId, word);
        if (word) word.classList.add('learned-word');
        (<HTMLButtonElement>e.target).disabled = true;
        (<HTMLButtonElement>e.target).classList.add('opacity');
        learnedWords.push(wordId);
        setItemToLocalStorage('learnedWords', JSON.stringify(learnedWords));
        const body: UserWordParameters = {
          difficulty: 'learned-word',
          optional: { testFieldString: 'test', testFieldBoolean: true },
        };
        removeDifficultWord();
        await createUserWord(myId, wordId, body);
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
  removeCard, difficultWord, renderDifficultPage, learnedWord,
};
