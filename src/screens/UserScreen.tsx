import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
/* firebaseのタイムスタンプを使うためimport */
import firebase from "firebase";
import { updateUser } from "../lib/firebase"
/* components */
import { Form } from "../components/Form"
import { Button } from "../components/Button"
import { Loading } from "../components/Loading"
/* contexts */
import { UserContext } from "../contexts/userContext";
/* types ReactNavigation Type checking with TypeScript */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "User">
  route: RouteProp<RootStackParamList, "User">
};

export const UserScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  /* userContextからユーザー情報を受け取る */
  const {user, setUser} = useContext(UserContext);
  /* 初期値は user.name */ 
  const [name, setName] = useState<string>(user.name);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async() => {
    setLoading(true)
    const updatedAt = firebase.firestore.Timestamp.now();
    await updateUser(user.id, {name: name, updatedAt: updatedAt});
    /* contextのuserに反映させる */
    setUser({ ...user, name, updatedAt });
    setLoading(false)
  }

  return(
    <SafeAreaView style={styles.container}>
      <Form 
        value={name} 
        onChangeText={(text) => {setName(text)}} 
        label="名前" 
      />
      <Button text="保存する" onPress={onSubmit}/>
      <Loading visible={loading} />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#fff",
  }
})