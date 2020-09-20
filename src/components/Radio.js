import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class Radio extends React.Component {
  setToggle() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }
  render() {
    //   alert(this.props.active);
    return (
      <View>
        <TouchableOpacity onPress={() => this.setToggle()}>
          <View style={styles.radioContainer}>
            <View style={styles.largeCirle}>
              {this.props.active ? <View style={styles.activeCirle} /> : null}
            </View>
            <Text style={styles.label}>
              {this.props.label ? this.props.label : null}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    marginRight: 20,
    alignItems: "center",
  },
  largeCirle: {
    width: 15,
    height: 15,
    borderWidth: 2,
    borderColor: "#3F67EB",
    // borderColor: Colors.secBorderColor,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCirle: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: "#3F67EB",
    // backgroundColor: Colors.primary,
  },
  label: {
    marginLeft: 5,
    // color:"black",
    // color: Colors.black,
    // fontFamily: Fonts.primary,
    // fontSize: Fonts.fontSizeTwo,
  },
});
