import * as firebase from 'firebase';
import "firebase/firestore";
import { Shelf } from '../types/shelf';
import Constants from "expo-constants";

if (!firebase.apps.length){
  firebase.initializeApp(Constants.manifest.extra.firebase);
}

export const getShelfs = async() => {
  const snapshot = await firebase
    .firestore()
    .collection("shelfs")
    .orderBy("score", "desc")
    .get();
  const shelfs = snapshot.docs.map(doc => doc.data() as Shelf);
  return shelfs
}