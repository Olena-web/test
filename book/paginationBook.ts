import { getWords } from '../js/api';
import { CardElement } from '../card/cardElement';
import { setItemToLocalStorage, getItemFromLocalStorage } from '../js/localStorage';
const currentPageUser = getItemFromLocalStorage('currentPage');
const userLevel = +currentPageUser.charAt(1);
const userPage = +currentPageUser.charAt(3)

export let currentPage = 0;
export const firstPage = 0;
export const totalPages = 30;
export let currentGroup = 0;

export async function changeLevel() {
  document.body.addEventListener('click', async (e: MouseEvent) => {
    const cardsOnPage = document.querySelector('.book-page');
    const level = document.querySelectorAll('.level');
    const myId: string = getItemFromLocalStorage('id');
    const pagination = document.querySelector('.pagination');

    level.forEach((button) => {
      button.classList.remove('active-page');
      pagination?.classList.remove('hide');
    });
    if (e.target) {
      if ((<HTMLButtonElement>e.target).classList.contains('level')) {
        const id = +(e.target as HTMLElement).id.split('level')[1];
        (e.target as HTMLElement).classList.add('active-page');
        if (!myId && id === 6) {
          (<HTMLButtonElement>e.target).disabled = true;
          console.log(<HTMLButtonElement>e.target);
        }

        if (cardsOnPage) cardsOnPage.innerHTML = '';
        const data = await getWords(id, firstPage);
        currentPage = firstPage;
        data.forEach((element) => {
          const cardOnPage = new CardElement(element).renderCard();
          const difficultBtn = document.querySelector('difficult');
          if (currentGroup === 6) {
           // console.log(currentGroup , difficultBtn)
           if (difficultBtn) difficultBtn.remove()
          }
          if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
          cardsOnPage?.setAttribute('id', `${id}`);
        });
        localStorage.removeItem('currentPage');
        setItemToLocalStorage('currentPage', JSON.stringify(`${id}-${currentPage}`));
        
        // const waitforLevel = setInterval(() => {
        //   const myId: string = getItemFromLocalStorage('id');
        //   const difficultLevel = document.getElementById('#level6') as HTMLButtonElement;
        //   if (myId && difficultLevel) {
        //     clearInterval(waitforLevel);
        //     console.log(difficultLevel);
        //     difficultLevel?.classList.remove('hide');
        //   }
        // });
        return cardsOnPage;
      }

      return cardsOnPage;
    }
  });
}

export async function prevPage() {
  if (currentPage > 0) {
    currentPage -= 1;
    const cardsOnPage = document.querySelector('.book-page');
    if (cardsOnPage) {
      currentGroup = (+cardsOnPage.id);
      localStorage.removeItem('currentPage');
      setItemToLocalStorage('currentPage', JSON.stringify(`${currentGroup}-${currentPage}`));
    }

    if (cardsOnPage) cardsOnPage.innerHTML = '';
    const data = await getWords(currentGroup, currentPage);
    data.forEach((element) => {
      const cardOnPage = new CardElement(element).renderCard();
      if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
    });
    return cardsOnPage;
  }
}

export async function nextPage() {
  if (currentPage < totalPages) {
    currentPage += 1;
    const cardsOnPage = document.querySelector('.book-page');
    if (cardsOnPage) {
      currentGroup = (+cardsOnPage.id);
      cardsOnPage.innerHTML = '';
      localStorage.removeItem('currentPage');
      setItemToLocalStorage('currentPage', JSON.stringify(`${currentGroup}-${currentPage}`));
    }

    const data = await getWords(currentGroup, currentPage);
    data.forEach((element) => {
      const cardOnPage = new CardElement(element).renderCard();
      if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
    });
    return cardsOnPage;
  }
}
