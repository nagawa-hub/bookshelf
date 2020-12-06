import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons"

type Props = {
  score: number;
  /* ?は任意の値として渡すため */
  starSize?: number;
  textSize?: number;
};

export const Stars: React.FC<Props> = ({
  score,
  /* デフォルトの値を設定 */
  starSize = 16,
  textSize = 14,
}) => {
  return(
  <View style={styles.container}>
    <FontAwesome 
      name={score >= 1 ? "star" : score >= 0.5 ? "star-half-o" : "star-o"}
      style={[styles.star, { fontSize: starSize }]} />
    <FontAwesome 
      name={score >= 2 ? "star" : score >= 1.5 ? "star-half-o" : "star-o"} 
      style={[styles.star, { fontSize: starSize }]} />
    <FontAwesome 
      name={score >= 3 ? "star" : score >= 2.5 ? "star-half-o" : "star-o"}
      style={[styles.star, { fontSize: starSize }]} />
    <FontAwesome 
      name={score >= 4 ? "star" : score >= 3.5 ? "star-half-o" : "star-o"} 
      style={[styles.star, { fontSize: starSize }]} />
    <FontAwesome 
      name={score >= 5 ? "star" : score >= 4.5 ? "star-half-o" : "star-o"} 
      style={[styles.star, { fontSize: starSize }]} />
    <Text style={[styles.scoreText, { fontSize: textSize }]}>{score}</Text>
  </View>
  )
};

const styles = StyleSheet.create({
  container:{
    /*　starを横並びに */
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8  
  },
  star:{
    color: "#3bf",
    marginRight: 4
  },
  scoreText:{
    color: "#000",
    fontWeight: "bold"
  }
})
