import React from "react";
import { Text, GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  /* TextをPropsで受け取れるように */
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

export const Button: React.FC<Props> = ({text, onPress}: Props) => {
  return(
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container:{
    margin: 16,
    height: 40,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  text:{
    fontSize: 18,
    color: "#fff"
  }
})