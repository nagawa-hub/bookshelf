import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

type Props = {
  visible: boolean;
}

export const Loading = ({ visible = false }: Props) => {
  return visible ?(
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})