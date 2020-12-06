import React, {useEffect, useState, useContext} from "react";
import { StyleSheet, SafeAreaView, Text, View, Image } from "react-native";
import firebase from "firebase"
import { createReviewRef, uploadImage } from "../lib/firebase"
import { pickImage } from "../lib/image-picker"
import { UserContext } from "../contexts/userContext"
import { getExtension } from "../utils/file"
/* components */
import { TextArea } from "../components/TextArea"
import { StarInput } from "../components/StarInput"
import { Button } from "../components/Button"
import { IconButton } from "../components/IconButton";
import { Loading } from "../components/Loading";
/* types ReactNavigation Type checking with TypeScript */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Review } from "../types/review";
/* contexts */
import { ReviewsContext } from "../contexts/reviewsContext"

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">
  route: RouteProp<RootStackParamList, "CreateReview">
};

export const CreateReviewScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  /* ルートに含まれるparamsを展開 */
  const {book} = route.params
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);
  const [imageUri, setImageUri] = useState<string>("")
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const {reviews, setReviews} = useContext(ReviewsContext);

  useEffect(() => {
    navigation.setOptions({ title: book.name })
  },[book])
  
  const onSubmit = async() => {
    setLoading(true)
    // 1.documentのIDを先に取得
    const reviewDocRef = await createReviewRef(book.id);
    // 2.storageのPathを決定 urlの変更
    const ext = getExtension(imageUri)
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`
    // 3.画像をstorageにアップロード
    const downloadUrl = await uploadImage(imageUri, storagePath)
    // 4.reviewドキュメントを作る
    const review = {
      id: reviewDocRef.id,
      user:{
        name: user.name,
        id: user.id
      },
      book:{
        name: book.name,
        id: book.id
      },
      text: text,
      score: score,
      imageUrl: downloadUrl,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now()
      } as Review;
      await reviewDocRef.set(review)
      // レビュー一覧に即時反映する 展開したreviewsの先頭に追加する
      setReviews([review,...reviews]);
      setLoading(false)
      navigation.goBack();
      // await addReview(book.id, review);
  }
  const onPickImage = async() => {
    const uri = await pickImage()
    setImageUri(uri)
  }


  return(
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)}/>
      <TextArea 
        value={text} 
        onChangeText={(value) => setText(value)}
        label="レビュー" 
        placeholder="レビューを記入してください"/>
      <IconButton iconName="camera" onPress={onPickImage}/>
        {!!imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      <Button text="レビューを投稿する" onPress={onSubmit}/>
      <Loading visible={loading}/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#fff",
  },
  image:{
    width: 100,
    height: 100,
    margin: 8,
  }
})