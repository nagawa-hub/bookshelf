import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
/* screen */
import { HomeScreen } from "../screens/HomeScreen";
import { BookScreen } from "../screens/BookScreen";
import { CreateReviewScreen } from "../screens/CreateReviewScreen";
/* types */
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  return(
    <Stack.Navigator
      // 戻るボタンの色を変更
      screenOptions={{
        headerTintColor: "#000"
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        /* ヘッダーを表示しない */
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Book"
        component={BookScreen}
      />
    </Stack.Navigator>
  );
}

export const HomeStackNavigator = () => {
  return(
    <RootStack.Navigator mode="modal">
       <RootStack.Screen
        name="Main"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="CreateReview" component={CreateReviewScreen} />

    </RootStack.Navigator>
  )
}