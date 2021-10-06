import React from "react";
import { StyleSheet } from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from "./TabNavigator";
import DetailedStory from '../screens/DetailedStory';

const Stack = createStackNavigator();

const StackNavigator=()=>{
    return(
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={BottomTabNavigator}/>
            <Stack.Screen name="DetailedStory" component={DetailedStory}/>
        </Stack.Navigator>
    )
}
export default StackNavigator


