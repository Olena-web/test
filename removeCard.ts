import { setItemToLocalStorage, getItemFromLocalStorage } from '../js/localStorage';
import { firstPage } from './paginationBook';
import { getWord } from '../js/api';
import { CardElement} from '../card/cardElement';
import { Word } from '../js/types';

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
  document.body.addEventListener('click', (e) => {
    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('difficult')) {
        const id = (e.target as HTMLElement).id.split('difficult')[1];
        const word = document.getElementById(`${id}`);
        if (word) word.classList.add('difficult-word');
        difficultWords.push(id);
        setItemToLocalStorage('difficultWords', JSON.stringify(difficultWords));
      }
    }
  });
}


export async function renderDifficultPage() {
  const cardsOnPage = document.querySelector('book-page');
  document.body.addEventListener('click', async (e) => {
  if (e.target) {
      let id = (e.target as HTMLElement).id.split('level')[1];
      if (id ==='6') {
  const difficultWordId = getItemFromLocalStorage('difficultWords');
  console.log(difficultWordId);
  if (cardsOnPage) cardsOnPage.innerHTML = '';
        // const data = await getWord(difficultWordId);
        // const cardOnPage = new CardElement(data).renderCard();
        // if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
        // };
        return cardsOnPage;
      }
      return cardsOnPage;
    }
  })}
  


export default { removeCard, difficultWord, renderDifficultPage };
