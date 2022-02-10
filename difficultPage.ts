import { setItemToLocalStorage, getItemFromLocalStorage } from '../js/localStorage';
import { firstPage } from './paginationBook';
import {
  getWord, createUserWord, getUserWord, getUserWordsAll, deleteUserWord,
} from '../js/api';
import { CardElement } from '../card/cardElement';
import { UserWordParameters } from '../js/types';

export const deletedCards: Array<string> = [];
export const difficultWords: Array<string> = [];

export const myId: string = getItemFromLocalStorage('id');
const difficultBtn = document.querySelector('difficult');
const deleteBtn = document.querySelector('delete');

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
      if ((e.target as HTMLElement).classList.contains('difficult')) {
        const wordId = (e.target as HTMLElement).id.split('difficult')[1];
        const word = document.getElementById(`${wordId}`);
        if (word) word.classList.add('difficult-word');
        const body: UserWordParameters = {
          difficulty: 'difficult-word',
          optional: { testFieldString: 'test', testFieldBoolean: true },
        };
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
        if (cardsOnPage) cardsOnPage.innerHTML = '';
        const diffWordsId = await getUserWordsAll(myId);
        diffWordsId.forEach(async (item) => {
          const diffWord = await getWord(item.wordId);
          const cardOnPage = new CardElement(diffWord).renderCard();
          // if (difficultBtn) difficultBtn.remove(); -doesn't work
          // if (deleteBtn) deleteBtn.innerHTML = 'non difficult'; -doesn't work
          if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
          difficultWords.push(JSON.stringify(diffWordsId));
          setItemToLocalStorage('difficultWords', JSON.stringify(difficultWords));
        });
      }
    }
  });
}

export default { removeCard, difficultWord, renderDifficultPage };
