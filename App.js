import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import * as Font from "expo-font";

import RootNavigator from "@navigators/RootNavigator";
import { MenuProvider } from "react-native-popup-menu";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    try {
      let primaryFont = require("@fonts/Pyidaungsu-Regular.ttf");
      let primaryFontBold = require("@fonts/Pyidaungsu-Bold.ttf");

      await Font.loadAsync({
        "Primary-Font": primaryFont,
        "Primary-Font-Bold": primaryFontBold,
        "Eng-Font": require("@fonts/Roboto-Regular.ttf"),
        "Eng-Font-Bold": require("@fonts/Roboto-Bold.ttf"),
      });
      this.setState({ fontLoaded: true });
    } catch (err) {}
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <MenuProvider>
          <RootNavigator />
        </MenuProvider>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
