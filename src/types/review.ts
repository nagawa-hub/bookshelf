import * as firebase from "firebase"

type UserRef = {
  id: string;
  /* 非正規化 */
  name: string;
}

type BookRef = {
  id: string;
  name: string;
}


export type Review = {
  id?: string;
  text: string;
  score: number;
  imageUrl: string;
  user: UserRef;
  book: BookRef;
  updatedAt: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
}