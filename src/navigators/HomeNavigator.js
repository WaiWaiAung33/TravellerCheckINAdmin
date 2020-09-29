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
import Registeruser from "@screens/dashboard/Registeruser";
import RegisterDetail from "@screens/dashboard/RegisterDetail";
import QrScan from "@screens/dashboard/QrScan";
import QrRegisterDetail from "@screens/dashboard/QrRegisterDetail";
import PlusDashboard from "@screens/dashboard/PlusDashboard";
import PlusCaseList from "@screens/dashboard/PlusCaseList";
import pluscasedetail from "@screens/dashboard/pluscasedetail";

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
          headerShown: false,
        }),
      },
      ToleGate: {
        screen: ToleGate,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },

      Detail: {
        screen: Detail,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      TravelNote: {
        screen: TravelNote,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      ToleGateList: {
        screen: ToleGateList,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      TravelNoteDetail: {
        screen: TravelNoteDetail,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      Edit: {
        screen: Edit,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      TravelQr: {
        screen: TravelQr,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      Registeruser: {
        screen: Registeruser,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      RegisterDetail: {
        screen: RegisterDetail,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      QrScan: {
        screen: QrScan,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      QrRegisterDetail: {
        screen: QrRegisterDetail,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      PlusDashboard: {
        screen: PlusDashboard,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      PlusCaseList: {
        screen: PlusCaseList,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      pluscasedetail: {
        screen: pluscasedetail,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
    },
    {
      initialRouteName: "Home",
    }
  )
);
