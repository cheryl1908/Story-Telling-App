import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateStory from '../screens/CreatStory'
import Feed from '../screens/Feed';
import {RFValue} from 'react-native-responsive-fontsize';
import firebase from 'firebase';

const Tab = createMaterialBottomTabNavigator();

export default class TabNavigator extends React.Component {
  constructor(props){
    super();
    this.state={
      light_theme:true,
      isupdated:false,
    };
  }
  componentDidMount(){
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  }
  removeUpdated=()=>{
    this.setState({
      isupdated:false
    })
  }
  changeUpdate=()=>{
    this.setState({
      isupdated:true
    })
  }
  renderFeed=props=>{
    return(
      <Feed setupdateToFalse={this.removeUpdated}{...props}/>
    )
  }
  renderStory=props=>{
    return(
      <CreateStory setupdateToTrue={this.changeUpdate}{...props}/>
    )
  }
  render(){
  return (
      <Tab.Navigator 
      labeled={false}
      barStyle={this.state.light_theme?styles.bottomTabStyleLight:styles.bottomTabStyle}
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
        <Tab.Screen name="Feed" component={this.renderFeed} options={{unmountOnBlur:true}}/>
        <Tab.Screen name="CreateStory" component={this.renderStory} options={{unmountOnBlur:true}}/>
      </Tab.Navigator>
  );
}
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