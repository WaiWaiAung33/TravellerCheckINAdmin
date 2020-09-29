import React from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  AsyncStorage,
  ScrollView,
  Text,
} from "react-native";
//import components
import PlusCaseListCard from "@components/PlusCaseListCard";
import Header from "@components/Header";
import Moment from "moment";

//import Api
const axios = require("axios");
import { TownshipDetail } from "@api/Url";

//import services
import { t, getLang } from "@services/Localization";

export default class ToleGate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      nrccode: "",
      nrcstate: "",
      nrcstaus: "",
      nrcnumber: "",
      locale: null,
    };
    this.BackHandler = null;
    this.page = 1;
  }
  async componentDidMount() {
    const res = await getLang();
    this.setState({ locale: res });
    this.setBackHandler();
    this.pluscaselist(this.page);
  }
  setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
  }
  _handleBackButton = () => {
    this.props.navigation.navigate("Home");
    return true;
  };
  UNSAFE_componentWillUnmount() {
    this.focusListener.remove();
  }
  async pluscaselist(page) {
    const self = this;
    const access_token = await AsyncStorage.getItem("access_token");
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + access_token,
    };
    let bodyParam = {
      tsh_name: self.props.navigation.getParam("township"),
      page: page,
    };
    // console.log(bodyParam);
    axios
      .post(TownshipDetail, bodyParam, {
        headers,
      })
      .then(function (response) {
        // console.log("PlusCaseList", response.data.pluscasedata.data);
        self.setState({
          data: response.data.pluscasedata.data,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    // const nrcnumber =this.state.nrccode+"/"+this.state.nrcstate+"("+this.state.nrcstaus+")"+this.state.nrcnumber;
    // console.log(this.state.data);
    return (
      <View style={styles.container}>
        <Header
          name={t("plustownship", this.state.locale)}
          Onpress={() => this.props.navigation.navigate("PlusDashboard")}
        />
        <ScrollView>
          <Text style={{ textAlign: "center", marginTop: 5 }}>
            Total plus case in {this.props.navigation.getParam("township")}=
            {this.props.navigation.getParam("total")}
          </Text>
          {this.state.data.map((item, index) => {
            // console.log("ToleGateLsit",item)
            return (
              <View key={index}>
                <PlusCaseListCard
                  name={item.name}
                  date={Moment(item.updated_at).format("DD-MM-YYYY")}
                  townshipname={item.peranent_township}
                  address={item.hospital_name}

                    OnPressCard={() => this.props.navigation.navigate("pluscasedetail",{datas:item})}
                />
              </View>
            );
          })}

        </ScrollView>
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
