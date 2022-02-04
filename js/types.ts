import { AbstractView } from "./views/AbstractView";

export interface Route {
  path: string,
  component: AbstractView
}
export interface Word {
  id:	string,
  group:	number,
  page:	number,
  word:	string,
  image:	string,
  audio:	string,
  audioMeaning:	string,
  audioExample:	string,
  textMeaning:	string,
  textExample:	string,
  transcription:	string,
  wordTranslate:	string,
  textMeaningTranslate:	string,
  textExampleTranslate:	string
}
export interface UserWord {
  userId: string, 
  wordId: string, 
  word: UserWordParameters
}

export interface UserWordParameters {
  difficulty: string, 
  optional: {testFieldString: 'test', testFieldBoolean: true} 
}

export interface TestFieldParameters {
  testFieldString: string, 
  testFieldBoolean: boolean
}

export interface User { 
  email: string, 
  password: string, 
}