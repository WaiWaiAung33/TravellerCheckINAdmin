import React from "react";
import {
  Alert,
  View,
  Text,
  Vibration,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  BackHandler,
  AsyncStorage,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

const axios = require("axios");
import {RegisterHistoryDetailApi} from "@api/Url";

export default class ExpoScanner extends React.Component {
  constructor(props) {
    super(props);
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.BackHandler = null;

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      scannedItem: {},
      isLoding: false,
      access_token: null,
    };
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ access_token: access_token });
    this.BackHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  }
  componentWillUnmount() {
    this.BackHandler.remove();
  }
  handleBackPress = () => {
    this.props.navigation.navigate("Home");
    return true;
  };

  onBarCodeRead({ type, data }) {
    // alert(data);
    if (
      (type === this.state.scannedItem.type &&
        data === this.state.scannedItem.data) ||
      data === null
    ) {
      return;
    }

    Vibration.vibrate();
    this.setState({ scannedItem: { data, type } });

    if (data) {
      // alert(data);
    const user_id = data;
    // alert(user_id)
      this._fetchMemberData(user_id);
    } else {
      this.renderAlert("This barcode is not supported.", `${type} : ${data}`);
    }
  }

  _fetchMemberData(user_id) {
    // alert(user_id);
    // console.log("User_id",user_id);
    const self = this;
    const url=user_id;
    // alert(url);
    if(url != null){
      self.props.navigation.navigate("QrRegisterDetail",{userid:url});
    }
  
  }

  renderAlert(title, message) {
    Alert.alert(
      title,
      message,
      [{ text: "OK", onPress: () => this.resetScanner() }],
      { cancelable: true }
    );
  }

  renderMessage() {
    return <Text style={styles.scanScreenMessage}>Scan QR Code</Text>;
  }

  resetScanner() {
    this.setState({
      scannedItem: {
        type: null,
        data: null,
      },
    });
  }

  render() {
    // console.log(this.state.access_token);
    let { navigation } = this.props;
    const marginTop = Platform.OS == "android" ? StatusBar.currentHeight : 50;
    if (this.props.navigation.getParam("status")) {
      return (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={this.onBarCodeRead}
            style={[StyleSheet.absoluteFill, styles.container]}
          >
            <View style={styles.layerTop}>{this.renderMessage()}</View>
            <View style={styles.layerCenter}>
              <View style={styles.layerLeft} />
              <View style={styles.focused} />
              <View style={styles.layerRight} />
            </View>
            <View style={styles.layerBottom}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </BarCodeScanner>
        </View>
      );
    }
    return null;
  }
}

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scanScreenMessage: {
    marginTop: 60,
    fontSize: 20,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 4,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
    flexDirection: "column-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  errorTextWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
  },
});
