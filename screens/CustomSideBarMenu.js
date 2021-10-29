import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";
import { DrawerContentScrollView} from "@react-navigation/drawer";
import { DrawerItemList } from "@react-navigation/drawer";

export default class CustomSideBarMenu extends React.Component{
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
        let props=this.props;
        return(
            <View style={{flex:1, backgroundColor:this.state.light_theme?"white":"black"}}>
                <Image source={require("../assets/logo.png")} style={styles.logoImage}/>
                <DrawerContentScrollView {...props}> 
                    <DrawerItemList {...props}>

                    </DrawerItemList>
                </DrawerContentScrollView>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    logoImage:{
        width:RFValue(140),
        height:RFValue(140),
        borderRadius:RFValue(70),
        marginTop:RFValue(60),
        alignSelf:"center",
        resizeMode:"contain",
    }
})