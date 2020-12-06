import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
/* screen */
import { HomeStackNavigator } from "./HomeStackNavigator"
import { UserScreen } from "../screens/UserScreen";

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return(
    <Tab.Navigator
      /* 色を変更 */
      tabBarOptions={{
        activeTintColor: "#900",
        inactiveTintColor: "#999"
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={26} />
          ),
        }} 
      />
      <Tab.Screen
        name="User" 
        component={UserScreen}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
};
