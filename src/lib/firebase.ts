import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth"
import Constants from "expo-constants";
/* types */
import { Shelf } from '../types/shelf';
import { User, initialUser } from '../types/user';
import { Review } from '../types/review';

if (!firebase.apps.length){
  firebase.initializeApp(Constants.manifest.extra.firebase);
}

export const getShelfs = async() => {
  const snapshot = await firebase
    .firestore()
    .collection("shelfs")
    .orderBy("score", "desc")
    .get();
  const shelfs = snapshot.docs.map(
  /* docのデータを展開したものと idをshelfとして返す  */
  (doc) => ({ ...doc.data(), id: doc.id} as Shelf)
  );
  return shelfs
}

export const signIn = async() => {
  const userCredential = await firebase.auth().signInAnonymously();
  // @ts-ignore firebaseのバージョンが問題？
  const { uid } = userCredential.user;
  /* usersをキーとしたuidが存在するか確認 */
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  if(!userDoc.exists){
    /* 存在しない場合initialUserを作成 */
    await firebase.firestore().collection("users").doc(uid).set(initialUser);
    return{
      ...initialUser,
      id: uid
    } as User;
  }else {
    return {
      id: uid,
      ...userDoc.data(),
    }as User;
  }  
}

export const updateUser = async(userId: string, params: any) => {
  await firebase.firestore().collection("users").doc(userId).update(params); 
}

export const createReviewRef = async(bookId: string) => {
  /* 指定されたbookの中にreviewsコレクションを作成、docのリファレンスを取得 */
  return await firebase
    .firestore()
    .collection("shelfs")
    .doc(bookId)
    .collection("reviews")
    .doc()
}

export const uploadImage = async(uri: string, path: string) => {
  // uriをblob形式に変換
  const localUri = await fetch(uri);
  const blob = await localUri.blob();
  // storageにupload
  const ref = firebase.storage().ref().child(path);

  // 結果をいれる変数
  let downloadUrl = ""
  try{
    await ref.put(blob);
    downloadUrl = await ref.getDownloadURL();
  }catch(err){
    console.log(err);
  }
  // 保存したcloud storage上のUrlを返す
  return downloadUrl;
}

export const getReviews = async(bookId: string) => {
  const reviewDocs = await firebase
    .firestore()
    .collection("shelfs")
    .doc(bookId)
    .collection("reviews")
    .orderBy("createdAt", "desc")
    .get();
  // docsという配列に入っている中身を展開してidをつけて返す　
  return reviewDocs.docs.map((doc) => ({...doc.data(), id: doc.id} as Review))
}