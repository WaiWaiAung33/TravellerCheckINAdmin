import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class ToleGateCard extends React.Component {
  _OnPress() {
    if (this.props.OnPressCard) {
      this.props.OnPressCard();
    }
  }
  _showNRCNumber() {
    if (this.props.citizen == 4) {
      return this.props.passport;
    } else {
      return this.props.nrc;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._OnPress()} activeOpacity={0.8}>
          <View>
            <Text style={{ textAlign: "right", fontWeight: "bold" }}>
              {this.props.date}
            </Text>
            <View>
              <Text style={styles.secondText}>{this.props.name}</Text>
              <Text style={styles.secondText}>{this._showNRCNumber()}</Text>
              <Text style={styles.secondText}>{this.props.phoneNo}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ffffff",
    borderRadius: 5,
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    backgroundColor: "#ffffff",
  },
  firstText: {
    width: "35%",
  },
  secondText: {
    // width: "65%",
    paddingTop: 6,
  },
});
