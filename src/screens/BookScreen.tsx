import React, {useEffect, useState, useContext} from "react";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { getReviews } from "../lib/firebase"
/* types ReactNavigation Type checking with TypeScript */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
/* components */
import { BookDetail } from "../components/BookDetail";
import { PlusButton } from "../components/PlusButton";
import { ReviewItem } from "../components/ReviewItem";
/* contexts */
import { ReviewsContext } from "../contexts/reviewsContext" 

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Book">
  route: RouteProp<RootStackParamList, "Book">
};

export const BookScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  // ルートに含まれるparamsを展開
  const {book} = route.params
  // const [reviews, setReviews] = useState<Review[]>([]);
  // → レビュー投稿後に即時反映されないため使わない contextで保持する
  const {reviews, setReviews} = useContext(ReviewsContext)
  // タイトルをbookからnameに変更
  useEffect(() => {
    navigation.setOptions({ title: book.name });
    
    const fetchReviews = async() => {
      const reviews = await getReviews(book.id)
      setReviews(reviews)
    };
      fetchReviews();
  },[book])

  // PlusButtonを押した時にCreReviewに遷移、パラメーターbook 
  return(
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<BookDetail book={book}/>} 
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
      />
      <PlusButton
        iconName="pluscircleo"
        onPress={() => navigation.navigate("CreateReview", {book} )}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
})
