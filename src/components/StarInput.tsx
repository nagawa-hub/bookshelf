import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"

type Props = {
  score: number;
  starSize?: number;
  onChangeScore: (value: number) => void;
};

export const StarInput: React.FC<Props> = ({
  score,
  starSize,
  onChangeScore
}: Props) => {
  const starStyle = [styles.container, starSize && {fontSize: starSize}]
  
  const stars = [1, 2, 3, 4, 5].map((starCount) => (
    <TouchableOpacity
      onPress={() => onChangeScore(starCount)}
      key={starCount.toString()}>
      <FontAwesome
        style={styles.star}
        name={score >= starCount ? "star" : "star-o"}/>
    </TouchableOpacity>
  ))

  return(
    <View style={styles.container}>{stars}</View>
  )
};

const styles = StyleSheet.create({
  container:{
    /* starを横並びに */
    flexDirection: "row",
    alignItems: "center",
    margin: 8  
  },
  star:{
    fontSize: 20,
    color: "#800",
    marginRight: 4
  },
})
