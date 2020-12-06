import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native"

type Props = {
  onChangeText: (text: string) => void;
  value: string;
  label: string;
};

export const Form: React.FC<Props> = ({
  value,
  label,
  onChangeText
}: Props) => {
  return(
	<View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput 
      style={styles.input}
      value={value}
      onChangeText={(text) => onChangeText(text)}
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
    height: 40,
    borderColor: "#999",
    borderBottomWidth: 1 
  }
})
