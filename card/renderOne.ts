import { CardElement } from "./cardElement";
import { getWord } from "./httpDataGetter";

export async function renderWord(id:string): Promise<HTMLElement> {
 const data = await getWord(id);
 const wordCard = new CardElement(data).renderCard();
 return wordCard;
}

 
export function cleanContainer():void {
 let parent = document.querySelector('.card-container') as HTMLElement;
 parent.innerHTML = "";
}   

