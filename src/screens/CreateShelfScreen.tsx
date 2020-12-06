import React, {useEffect, useState} from "react";
import { StyleSheet, SafeAreaView, Text, View, Image } from "react-native";
import { pickImage } from "../lib/image-picker"
import { createShelfRef, uploadImage } from "../lib/firebase";
import { getExtension } from "../utils/file"
/* types ReactNavigation Type checking with TypeScript */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
/* componets */
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { IconButton } from "../components/IconButton";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading"
/* types */
import { Shelf } from "../types/shelf";


type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateShelf">
  route: RouteProp<RootStackParamList, "CreateShelf">
};

export const CreateShelfScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const [title, setTitle] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  const [score, setScore] = useState<number>(3)
  const [imageUri, setImageUri] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const onPickImage = async() => {
    const uri = await pickImage()
    setImageUri(uri)
  }

  const onSubmit = async() => {
    setLoading(true);
    const shelfDocRef = await createShelfRef()
    const ext = getExtension(imageUri);
    const storagePath = `shelfs/${shelfDocRef.id}.${ext}`
    const downloadUrl = await uploadImage(imageUri, storagePath)
    const book = {
      name: title,
      author: author,
      score: score,
      imageUrl: downloadUrl,
    } as Shelf;
    await shelfDocRef.set(book)
    setLoading(false)
    navigation.goBack();
  }

  return(
    <SafeAreaView style={styles.container}>
      <TextArea
        value={title}
        label="タイトル"
        onChangeText={(value) => {setTitle(value)}}
        placeholder="本のタイトル"
      />
      <TextArea
        value={author}
        label="著者"
        onChangeText={(value) => {setAuthor(value)}}
        placeholder="本の著者"
      />
      <View style={styles.view}>
        <Text style={styles.text}>評価</Text>
        <StarInput score={score} onChangeScore={(score) => {setScore(score)}}/>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>画像を選択</Text>
        <IconButton iconName="camera" onPress={onPickImage}/>
        {!!imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
      <Button text="投稿する" onPress={onSubmit}/>
      <Loading visible={loading}/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#fff",
  },
  view:{
    padding: 16,
  },
  text:{
    fontWeight: "bold",
  },
  image:{
    width: 200,
    height: 250,
    margin: 8
  }
})