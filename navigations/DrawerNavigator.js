import React from 'react';
import { StyleSheet, TabBarIOS, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import Profile from '../screens/Profile';
import Logout from '../screens/Logout';
import CustomSideBarMenu from '../screens/CustomSideBarMenu';
import firebase from "firebase";

const Drawer=createDrawerNavigator();

export default class DrawerNavigator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          light_theme: true,
        };
      }
      componentDidMount() {
        this.fetchUser();
      }
      fetchUser = () => {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            theme = snapshot.val().current_theme;
            this.setState({ light_theme: theme === "light" });
          });
      };    
    render(){
        var props=this.props;

        return(
            <Drawer.Navigator 
                    drawerContentOptions={{activeTintColor:"darkblue", 
                                        inactiveTintColor:this.state.light_theme?"black":"white",
                                        itemStyle:{marginVertical:5}
                                         }}
                    drawerContent={props=><CustomSideBarMenu {...props}/>}>
                <Drawer.Screen name="Home" component={StackNavigator} options={{unmountOnBlur:true}}/>
                <Drawer.Screen name="Profile" component={Profile} options={{unmountOnBlur:true}}/>
                <Drawer.Screen name="Logout" component={Logout} options={{unmountOnBlur:true}}/>
            </Drawer.Navigator>
        )
    }
} 