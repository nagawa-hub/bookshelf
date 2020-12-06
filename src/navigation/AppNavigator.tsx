import React, {useContext} from "react"
import { NavigationContainer } from '@react-navigation/native';
/* navigator */
import { MainTabNavigator } from "./MainTabNavigator";
/* screens */
import { AuthScreen } from "../screens/AuthScreen";
/* contexts */
import { UserContext } from "../contexts/userContext";

export const AppNavigator = () => {
  /* userContextからユーザー情報を受け取る */
  const {user} = useContext(UserContext); 

  return(
    <NavigationContainer>
      {!user ? <AuthScreen/> : <MainTabNavigator/>}
    </NavigationContainer>
  )
}