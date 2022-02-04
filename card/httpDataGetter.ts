import { Word } from "../js/types";

export async function getWord(id:string): Promise<Word> {
 //нужно заимплементить http клиент

 return {
  "id": "5e9f5ee35eb9e72bc21af4a4",
  "group": 0,
  "page": 0,
  "word": "August",
  "image": "files/01_0004.jpg",
  "audio": "files/01_0004.mp3",
  "audioMeaning": "files/01_0004_meaning.mp3",
  "audioExample": "files/01_0004_example.mp3",
  "textMeaning": "<i>August</i> is the eighth month of the year.",
  "textExample": "Is your birthday in <b>August</b>?",
  "transcription": "[ɔ́ːgəst]",
  "textExampleTranslate": "У тебя день рождения в августе?",
  "textMeaningTranslate": "Август - восьмой месяц года",
  "wordTranslate": "август"
  };
}

export async function getAllWord(): Promise<Array<Word>> {
  //нужно заимплементить http клиент
  return [{
      "id": "5e9f5ee35eb9e72bc21af4a4",
      "group": 0,
      "page": 0,
      "word": "August",
      "image": "files/01_0004.jpg",
      "audio": "files/01_0004.mp3",
      "audioMeaning": "files/01_0004_meaning.mp3",
      "audioExample": "files/01_0004_example.mp3",
      "textMeaning": "<i>August</i> is the eighth month of the year.",
      "textExample": "Is your birthday in <b>August</b>?",
      "transcription": "[ɔ́ːgəst]",
      "textExampleTranslate": "У тебя день рождения в августе?",
      "textMeaningTranslate": "Август - восьмой месяц года",
      "wordTranslate": "август"
    }
  ]
}  