import {Shelf} from "./shelf"

export type RootStackParamList = {
  Home: undefined;
  /* Shelfの型を受け取る */
  Book: { book: Shelf };
  User: undefined;
  CreateReview: { book: Shelf};
  CreateShelf: { book: Shelf};
  Main: undefined;
}