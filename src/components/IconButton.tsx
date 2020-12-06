import React from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

type Props = {
  /* アイコンの名前をPropsで渡せるように */
  iconName: string;
  onPress: (event: GestureResponderEvent) => void;
}

export const IconButton: React.FC<Props> = ({iconName, onPress}: Props) => {
  return(
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <AntDesign name={iconName} size={36} color="black" />      
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container:{
    margin: 12,
  }
})