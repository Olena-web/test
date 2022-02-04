import { getWords } from '../js/api';
import { CardElement } from '../card/cardElement';


export async function renderPage(group: number, page: number) :Promise<HTMLElement> {
    const data = await getWords(group, page);
    data.forEach((element) => {
        const cardOnPage = new CardElement(element).renderCard();
        const Page = document.querySelector('#book');
        if (Page) Page.appendChild(cardOnPage);
        return Page;
    })
    
    return <HTMLDivElement>document.querySelector('#book');
}
