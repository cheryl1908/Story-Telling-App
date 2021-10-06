import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateStory from '../screens/CreatStory'
import Feed from '../screens/Feed';
import {RFValue} from 'react-native-responsive-fontsize';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator=()=> {
  return (
      <Tab.Navigator 
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({route})=>({
        tabBarIcon:({focused,color,size})=>{
          var iconName
          if(route.name==="Feed"){
            iconName=focused?"home":"home-outline"
          }else if(route.name ==="CreateStory"){
            iconName=focused?"add-circle":"add-circle-outline"
          }
          return <Ionicons style={styles.icons} name={iconName} size={RFValue(25)} color={color}/>
        },
      })}
      tabBarOptions={{activeTintColor:"#ee8249", inactiveTintColor:"grey"}}
      >
        <Tab.Screen name="Feed" component={Feed}/>
        <Tab.Screen name="CreateStory" component={CreateStory}/>
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});
export default TabNavigator