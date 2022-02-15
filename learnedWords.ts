import { UserWordParameters } from '../js/types';
import { setItemToLocalStorage } from '../js/localStorage';
import { removeDifficultWord } from './difficultPage';
import { createUserWord } from '../js/api';
import { myId } from '../card/cardElement';

export const learnedWords: Array<string> = [];

export function learnedWord() {
  const difficultBtn = document.querySelectorAll('difficult');
  difficultBtn.forEach((btn) => {
    const btnId = btn.id.split('difficult')[1];
    console.log(btnId);
    
     // if(btnId === wordId){
    //   btn.disabled = true;
    //   btn.classList.add('opacity');
    // }

  })
  document.body.addEventListener('click', async (e):Promise< void> => {
    if (e.target) {
      const difficultBtn = document.querySelectorAll('difficult');
      difficultBtn.forEach(async (btn) => {
      const btnId = (<HTMLButtonElement>btn).id.split('difficult')[1];
      console.log(btnId);
     

  
      if ((<HTMLButtonElement>e.target).classList.contains('delete')) {
        
        const wordId = (<HTMLButtonElement>e.target).id.split('delete')[1];
        const word = document.getElementById(`${wordId}`);

        if(btnId === wordId){
          (<HTMLButtonElement>btn).disabled = true;
       btn.classList.add('opacity');
      }


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
    })
    }
  });
}
export default learnedWord;