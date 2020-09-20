import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

export default class Header extends React.Component {
  _OnPress() {
    if (this.props.Onpress) {
      this.props.Onpress();
    }
  }
  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: "#308DCC",
          },
        ]}
      >
        <TouchableOpacity onPress={() => this._OnPress()} style={{ width: 50 }}>
          <Image
            source={
              this.props.img ? this.props.img : require("@images/backarrow.png")
            }
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>

        <Text style={styles.text}>{this.props.name}</Text>
        {
          this.props.number ? (
            <View
            style={{
              marginRight: 10,
              width: 25,
              height: 25,
              borderWidth: 1,
              borderRadius: 13,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:"white",
              borderColor:"white"
            }}
          >
            <Text>{this.props.number}</Text>
          </View>
          ):null
        }
      
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // height:50,
    // backgroundColor: "#FE7F0A",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    // flex:1
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    // paddingTop: 30,
  },
  img: {
    width: 25,
    height: 25,
    marginLeft: 10,
    // marginTop: 40,
  },
});
