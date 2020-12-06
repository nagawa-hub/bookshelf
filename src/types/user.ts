import * as firebase from "firebase";

export type User = {
  // 任意の値を持たせるため ? 
  id?: string;
  name: string;
  updatedAt: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
};

export const initialUser: User = {
  name: "",
  updatedAt: firebase.firestore.Timestamp.now(),
  createdAt: firebase.firestore.Timestamp.now()
}