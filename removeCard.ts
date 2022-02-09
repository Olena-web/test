import { setItemToLocalStorage, getItemFromLocalStorage } from '../js/localStorage';
import { firstPage } from './paginationBook';
import { getWord, createUserWord } from '../js/api';
import { CardElement } from '../card/cardElement';
import { UserWordParameters } from '../js/types';

export const deletedCards: Array<string> = [];
export const difficultWords: Array<string> = [];

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
  document.body.addEventListener('click', async (e) => {
    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('difficult')) {
        const wordId = (e.target as HTMLElement).id.split('difficult')[1];
        const word = document.getElementById(`${wordId}`);
        if (word) word.classList.add('difficult-word');
        difficultWords.push(wordId);
        setItemToLocalStorage('difficultWords', JSON.stringify(difficultWords));
        // const difficultWordId: string = (JSON.parse(getItemFromLocalStorage('difficultWords')));

        const myId: string = getItemFromLocalStorage('id');
        const body: UserWordParameters = {
          difficulty: 'difficult-word',
          optional: { testFieldString: 'test', testFieldBoolean: true },
          // word: {
          //   difficulty: 'difficult',
          //   optional: { testFieldString: 'test', testFieldBoolean: true },
          // },
        };
        
        const newDifficultWord = await createUserWord(myId, wordId, body);
        console.log(newDifficultWord);
        // return newDifficultWord;
      }
    }
  });
}

export async function renderDifficultPage() {
  document.body.addEventListener('click', async (e) => {
    const cardsOnPage = document.querySelector('.book-page');
    if (e.target) {
      const id = (e.target as HTMLElement).id.split('level')[1];
      if (id === '6') {
        const difficultWordId = (JSON.parse(getItemFromLocalStorage('difficultWords')));
        if (cardsOnPage) cardsOnPage.innerHTML = '';
        for (let i = 0; i < difficultWordId.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          const data = await getWord(difficultWordId[i]);
          const cardOnPage = new CardElement(data).renderCard();
          if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
        }
        return cardsOnPage;
      }
      return cardsOnPage;
    }
  });
}

export default { removeCard, difficultWord, renderDifficultPage };
