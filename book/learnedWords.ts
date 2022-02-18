import { UserWordParameters, UserStatistics } from '../js/types';
import { setItemToLocalStorage, getItemFromLocalStorage } from '../js/localStorage';
import { removeDifficultWord } from './difficultPage';
import { createUserWord, putUserStatistics, getUserLearnedWords } from '../js/api';
import { myId } from '../card/cardElement';

export const learnedWords: Array<string> = [];

export const learnedDayWords: Array<string> = [];

export function learnedWord() {
  document.body.addEventListener('click', async (e):Promise< void> => {
    if (e.target) {
      if ((<HTMLButtonElement>e.target).classList.contains('delete')) {
        const wordId = (<HTMLButtonElement>e.target).id.split('delete')[1];
        const word = document.getElementById(`${wordId}`);
        if (word) word.classList.add('opacity');
        word?.classList.remove('difficult-word');
        (<HTMLButtonElement>e.target).disabled = true;
        (<HTMLButtonElement>e.target).classList.add('opacity');
        learnedWords.push(wordId);
        setItemToLocalStorage('learnedWords', JSON.stringify(learnedWords));
        const body: UserWordParameters = {
          difficulty: 'learned-word',
          // optional: { newWord: false },
        };
        await removeDifficultWord();
        await createUserWord(myId, wordId, body);
        const dataForStatistic = {
          learnedWords: learnedWords.length,
          // optional: {},
        };
        await putUserStatistics(dataForStatistic);
      }
    }
  });
}

export const numberDayLearnedWords = () => {
  if (getItemFromLocalStorage('learnedWords')) {
    const number = getItemFromLocalStorage('learnedWords').split(',').length;
    return number;
  }
  return 0;
};
export async function getData() {
  const data = await getUserLearnedWords(myId).then((d) => {
    const count = d[0].totalCount[0];
    const numberWords = Object.values(Object.values(count))[0];
    return numberWords;
  });
}

export const percentLearnedWords = () => {
  const numberLearnedWords = numberDayLearnedWords();
  const allWords = 4000;
  const percent = (numberLearnedWords / allWords) * 100;
  return percent;
};

export default { learnedWord, getData, percentLearnedWords };