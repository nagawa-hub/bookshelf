import React from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

type Props = {
  /* アイコンの名前をPropsで渡せるように */
  iconName: string;
  onPress: (event: GestureResponderEvent) => void;
}

export const PlusButton: React.FC<Props> = ({iconName, onPress}: Props) => {
  return(
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <AntDesign name={iconName} size={56} color="black" />      
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container:{
    position: "absolute",
    right: 16,
    bottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
})