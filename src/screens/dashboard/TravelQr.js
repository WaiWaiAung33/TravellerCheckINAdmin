import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { QRCode } from "react-native-custom-qr-codes";
import * as Permissions from "expo-permissions";
//import components
import ToleGateCardOne from "@components/ToleGateCardOne";
import Header from "@components/Header";
import SuccessModal from "@components/SuccessModal";
import Moment from "moment";
const axios = require("axios");
import { CancelApi } from "@api/Url";

//import services
import { t, getLang } from "@services/Localization";

export default class ToleGate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      access_token: null,
      isOpenSuccessModel: false,
      locale: null,
    };
    this.BackHandler = null;
  }
  async componentDidMount() {
    const res = await getLang();
    this.setState({ locale: res });
    const user_id = await AsyncStorage.getItem("userid");
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ userid: user_id, access_token: access_token });
    this.setBackHandler();
  }
  setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
  }
  _handleBackButton = () => {
    this.props.navigation.navigate("TravelNote");
    return true;
  };
  UNSAFE_componentWillUnmount() {
    this.focusListener.remove();
  }
  _handleCancel() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };
    let bodyParam = {
      userId: this.props.navigation.getParam("data").id,
      status: 4,
      qr_status: 2,
      cancel_status: 2,
    };
    // console.log(GetTownshipApi);
    axios
      .post(CancelApi, bodyParam, {
        headers,
      })
      .then(function (response) {
        console.log(response.data);
        self.setState({ isOpenSuccessModel: true });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
    this.props.navigation.navigate("TravelNote");
  }
  render() {
    let data = this.props.navigation.getParam("data");
    // console.log("Travel Qr", data);
    return (
      <View style={styles.container}>
        <Header
          name={t("qrlist", this.state.locale)}
          Onpress={() => this.props.navigation.navigate("TravelNote")}
        />
        <ScrollView>
          <TouchableOpacity style={styles.qrcodeBox}>
            <QRCode
                content={data.id.toString()}
              codeStyle="square"
              size={100}
            />
          </TouchableOpacity>
          <View
            style={{
              height: 2,
              borderWidth: 1,
              // flex: 1,
              marginTop: 10,
              borderColor: "#308DCC",
            }}
          />
          <View
            style={{
              alignItems: "flex-end",
              marginRight: 10,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: 160,
                height: 40,
                backgroundColor: "#EB4D4D",
                borderWidth: 1,
                borderColor: "#EB4D4D",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
              onPress={() => this._handleCancel()}
            >
              <Text style={{ color: "white" }}>
                {t("cancelregister", this.state.locale)}
              </Text>
            </TouchableOpacity>
          </View>
          <ToleGateCardOne
            date={Moment(data.created_at).format("DD-MM-YYYY")}
            name={data.name}
            nrc={
              data.nrc_code +
              "/" +
              data.nrc_state +
              "(" +
              data.nrc_type +
              ")" +
              data.nrc_no
            }
            passportNo={data.passport ? data.passport : null}
            phoneNo={data.ph_no}
            OnPressCard={() => this.props.navigation.navigate("TravelNoteDetail",{user_id:data.id,backRoute:"TravelQr"})}
            cityzien={data.citizen_status}
          />
        </ScrollView>
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text={t("cancelsuccess",this.state.locale)}
          onClose={() => this._handleOnClose()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  qrcodeBox: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    // marginRight: 15,
  },
});
