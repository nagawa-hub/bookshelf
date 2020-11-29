import React from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
/* conponents */
import {Stars} from "./Stars"
/* types */
import { Shelf } from "../types/shelf";

/* 画面の横幅を取得 */
const {width} = Dimensions.get("window")
/* 画像の横幅を取得 */
const CONTAINER_WIDTH = width / 2;
const PADDING = 16;
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2;

type Props = {
  shelf: Shelf;
};

export const BookReviewItem: React.FC<Props> = ({shelf}: Props) => {
  const {name, author, imageUrl, score} = shelf;
  return(
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image}/>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.authorText}>{author}</Text>
      <Stars score={score}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    width: CONTAINER_WIDTH,
    padding: 16
  },
  image:{
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH * 0.7,
  },
  nameText:{
    fontSize: 16,
    color: "#000",
    marginTop: 8,
    fontWeight: "bold"
  },
  authorText: {
    fontSize: 12,
    color: "#888",
    marginTop: 8
  }
})
