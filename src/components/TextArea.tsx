import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native"

type Props = {
  onChangeText: (text: string) => void;
  value: string;
  label: string;
  height?: number;
  placeholder?: string;
};

export const TextArea: React.FC<Props> = ({
  value,
  label,
  height,
  placeholder,
  onChangeText
}: Props) => {
  return(
	<View style={[styles.container, !!height && { height }]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput 
      style={styles.input}
      value={value}
      onChangeText={(text) => onChangeText(text)}
      multiline={true}
      placeholder={placeholder}
    />
	</View>
  )
};

const styles = StyleSheet.create({
  container:{
    padding: 16,
  },
  label:{
    fontWeight: "bold"
  },
  input:{
    borderColor: "#999", 
  }
})
