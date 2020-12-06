import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, View, SafeAreaView } from 'react-native';
/* lib */
import {getShelfs} from "../lib/firebase"
/* components */
import {BookReviewItem} from "../components/BookReviewItem"
/* types */
import { Shelf } from '../types/shelf';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { PlusButton } from '../components/PlusButton';

// ホームスクリーンが受け取るPropsを定義
type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">
}

export const HomeScreen = ({navigation}: Props) => {
  const [shelfs, setShelfs] = useState<Shelf[]>([]);
  useEffect(() => {
    getFirebaseItems();
  },[]);

  const getFirebaseItems = async() => {
    const shelfs = await getShelfs()
    setShelfs(shelfs)
  }

  const onPressBook = (book: Shelf) => {
    // HomeStackNavigationのBookをキーとして遷移 第2引数は遷移時に渡すパラメーター
    navigation.navigate("Book", { book });
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shelfs}
        renderItem={({ item }: { item: Shelf }) => (
          <BookReviewItem shelf={item} onPress={ () => onPressBook(item)}/>
        )}
        keyExtractor={(item, index) => index.toString()}
        // 横２列、縦２列に
        numColumns={2} 
      />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

