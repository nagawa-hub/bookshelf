import React, { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, ActivityIndicator } from "react-native";
import { signIn } from "../lib/firebase"
import { UserContext } from "../contexts/userContext"

export const AuthScreen: React.FC = () => {
  const {setUser} = useContext(UserContext);
  
  /* 初回のmounting時だけ呼び出したいので第二引数は[] */
  useEffect(() => {
    const fetchUser = async() => {
      const user = await signIn();
      /* setUserによってグローバルなuserをセットする */
      setUser(user);
    };
    fetchUser()
  },[])
  return(
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>ログイン中...</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})