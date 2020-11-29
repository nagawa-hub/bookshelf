import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, View, SafeAreaView } from 'react-native';
/* lib */
import {getShelfs} from "./src/lib/firebase"
/* components */
import {BookReviewItem} from "./src/components/BookReviewItem"
/* types */
import { Shelf } from './src/types/shelf';

export default function App() {
  const [shelfs, setShelfs] = useState<Shelf[]>([]);
  useEffect(() => {
    getFirebaseItems();
  },[]);

  const getFirebaseItems = async() => {
    const shelfs = await getShelfs()
    setShelfs(shelfs)
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shelfs}
        renderItem={({ item }: { item: Shelf }) => (
          <BookReviewItem shelf={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        /* 横２列、縦２列に */
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

