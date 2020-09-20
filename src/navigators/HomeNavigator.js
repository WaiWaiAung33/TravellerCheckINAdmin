import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "@screens/dashboard/Home";
import Create from "@screens/dashboard/Create";
import ToleGate from "@screens/dashboard/ToleGate";
import Detail from "@screens/dashboard/Detail";
import TravelNote from "@screens/dashboard/TravelNote";
import TravelNoteDetail from "@screens/dashboard/TravelNoteDetail";
import ToleGateList from "@screens/dashboard/ToleGateList";
import Edit from "@screens/dashboard/Edit";
import TravelQr from "@screens/dashboard/TravelQr";
import CreateNew from "@screens/dashboard/CreateNew";;
export default createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      Create: {
        screen: Create,

        navigationOptions: ({ navigation }) => ({
          // headerTitle: "အချက်အလက်များဖြည့်ရန်",
          // headerTintColor:"white",
          // headerStyle: {
          //   backgroundColor: "#308DCC",
          // },

          // headerTitleStyle: {
          //   fontWeight: "bold",
          //   fontSize:18
          // },
          headerShown:false
        }),
      },
      ToleGate:{
        screen:ToleGate,
        navigationOptions: ({ navigation }) => ({
          headerShown:false
          // headerTitle: "QR Code ဖတ်ရန်",
          // headerTintColor:"white",
          // headerStyle: {
          //   backgroundColor: "#308DCC",
          // },

          // headerTitleStyle: {
          //   fontWeight: "bold",
          //   fontSize:18
          // },
        }),
      },
      CreateNew:{
        screen:CreateNew,
        navigationOptions: ({ navigation }) => ({
          headerShown:false
          // headerTitle: "QR Code ဖတ်ရန်",
          // headerTintColor:"white",
          // headerStyle: {
          //   backgroundColor: "#308DCC",
          // },

          // headerTitleStyle: {
          //   fontWeight: "bold",
          //   fontSize:18
          // },
        }),
      },
      Detail:{
        screen:Detail,
        navigationOptions: ({ navigation }) => ({
          headerShown:false
          // headerTitle: "အသေးစိတ်အချက်အလက်များ",
          // headerTintColor:"white",
          // headerStyle: {
          //   backgroundColor: "#308DCC",
          // },

          // headerTitleStyle: {
          //   fontWeight: "bold",
          //   fontSize:18
          // },
        }),
      },
      TravelNote:{
        screen:TravelNote,
        navigationOptions: ({ navigation }) => ({
          headerShown:false
          // headerTitle: "ခရီးသွားမှတ်တမ်းများ",
          // headerTintColor:"white",
          // headerStyle: {
          //   backgroundColor: "#308DCC",
          // },

          // headerTitleStyle: {
          //   fontWeight: "bold",
          //   fontSize:18
          // },
        }),
      },
      ToleGateList:{
        screen:ToleGateList,
        navigationOptions: ({ navigation }) => ({
          headerShown:false
          // headerTitle: "ခရီးသွားမှတ်တမ်းများ",
          // headerTintColor:"white",
          // headerStyle: {
          //   backgroundColor: "#308DCC",
          // },

          // headerTitleStyle: {
          //   fontWeight: "bold",
          //   fontSize:18
          // },
        }),
      },
      TravelNoteDetail:{
        screen:TravelNoteDetail,
        navigationOptions:({navigation})=>({
          headerShown:false
        })
      },
      Edit:{
        screen:Edit,
        navigationOptions:({navigation})=>({
          headerShown:false
        })
      },
      TravelQr:{
        screen:TravelQr,
        navigationOptions:({navigation})=>({
          headerShown:false
        })
      }
    },
    {
      initialRouteName: "Home",
    }
  )
);
