import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  BackHandler,
  AsyncStorage,
} from "react-native";

//import components
import Header from "@components/Header";

//import services
import { t, getLang } from "@services/Localization";

const axios = require("axios");
import { RegisterHistoryDetailApi } from "@api/Url";
import { TouchableHighlight, BaseUrl } from "react-native-gesture-handler";

export default class ToleGateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      name: "",
      nrc: "",
      phone: "",
      vehical: "",
      start_place: "",
      end_place: "",
      passport: "",
      citizenstatus: null,
      imagePath: "",
      nrcfrontName: "",
      nrcbackName: "",
      moName: "",
      approvephotoName: "",
      ministatystatus: null,
      locale: null,
      department: "",
      designation: "",
      ministry_input: "",
      check_by: "",
      approve_by: "",
      gender:""
    };
    this.BackHandler = null;
  }
  async componentDidMount() {
    const res = await getLang();
    this.setState({ locale: res });
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ access_token: access_token });
    this.setBackHandler();
    this.getAllTravelNote();
  }

  getAllTravelNote() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };
    let bodyParam = {
      userId: self.props.navigation.getParam("userid")
        ? self.props.navigation.getParam("userid")
        : self.props.navigation.getParam("user_id"),
    };
    // console.log(GetTownshipApi);
    axios
      .post(RegisterHistoryDetailApi, bodyParam, {
        headers,
      })
      .then(function (response) {
        console.log("Register Detail", response.data);
        let data = response.data;
        self.setState({
          name: data.historyDetail.name,
          phone: data.historyDetail.ph_no,
          vehical: data.historyDetail.vehical_no,
          nrc:
            data.historyDetail.nrc_code +
            "/" +
            data.historyDetail.nrc_state +
            "(" +
            data.historyDetail.nrc_type +
            ")" +
            data.historyDetail.nrc_no,
          passport: data.historyDetail.passport,
          citizenstatus: data.historyDetail.citizen_status,
          start_place:
            data.historyDetail.city +
            " " +
            data.historyDetail.township +
            " " +
            data.historyDetail.start_place,
          end_place:
            data.endplace_township + " " + data.historyDetail.end_place,
          imagePath: data.historyDetail.path,
          nrcfrontName: data.historyDetail.nrc_front,
          nrcbackName: data.historyDetail.nrc_back,
          moName: data.historyDetail.mo_photo,
          approvephotoName: data.historyDetail.approve_photo,
          designation: data.historyDetail.designation,
          department: data.historyDetail.department,
          ministry_input: data.historyDetail.ministry_input,
          check_by: data.historyDetail.checked_by,
          approve_by: data.historyDetail.approved_by,
          gender:data.historyDetail.sex
          // citizenstatus: data.historyDetail.ministry_status,
        });
        // self.setState({ isOpenSuccessModel: true });
      })
      .catch(function (err) {
        // console.log("TravelNoteDetail Error");
      });
  }

  setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
  }
  _handleBackButton = () => {
    const data = this.props.navigation.getParam("backRoute");
    this.props.navigation.navigate(data);
    return true;
  };
  UNSAFE_componentWillUnmount() {
    this.focusListener.remove();
  }
  _showName() {
    if (this.state.citizenstatus == 2) {
      return t("religionNo", this.state.locale);
    } else if (this.state.citizenstatus == 4) {
      return t("forino", this.state.locale);
    } else {
      return t("nrcno", this.state.locale);
    }
  }
  showNameNo() {
    if (this.state.citizenstatus == 4) {
      return this.state.passport;
    } else {
      return this.state.nrc;
    }
  }
  render() {
    // console.log(this.props.navigation.getParam("userid"));
    const data = this.props.navigation.getParam("backRoute");
    return (
      <View>
        <Header
          name={t("detail", this.state.locale)}
          Onpress={() => this.props.navigation.navigate(data)}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 100 }}
        >
          <View style={styles.container}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>
                {this.state.citizenstatus == 2
                  ? t("Bhikkhuname", this.state.locale)
                  : t("name", this.state.locale)}
              </Text>
              <Text style={styles.secondText}>{this.state.name}</Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>
                {t("gender",this.state.locale)}
              </Text>
              <Text style={styles.secondText}>{this.state.gender == "0" ? t("male",this.state.locale) : t("female",this.state.locale)}</Text>
            </View>

            
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>{this._showName()}</Text>
              <Text style={styles.secondText}>
                {this.showNameNo()}
                {/* {this.state.passport !=null ? this.state.passport : this.state.nrc} */}
              </Text>
            </View>
            {this.state.citizenstatus == 1 || this.state.citizenstatus ==3 ? (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.firstText}>
                    {t("designation", this.state.locale)}
                  </Text>
                  <Text style={styles.secondText}>
                    {this.state.designation}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.firstText}>
                    {t("department", this.state.locale)}
                  </Text>
                  <Text style={styles.secondText}>{this.state.department}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.firstText}>
                    {t("ministry_name", this.state.locale)}
                  </Text>
                  <Text style={styles.secondText}>
                    {this.state.ministry_input}
                  </Text>
                </View>
              </View>
            ) : null}

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>
                {t("phone", this.state.locale)}
              </Text>
              <Text style={styles.secondText}>{this.state.phone}</Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>
                {t("vehical", this.state.locale)}
              </Text>
              <Text style={styles.secondText}>{this.state.vehical}</Text>
            </View>
          </View>
          <View
            style={{
              height: 2,
              borderWidth: 1,
              // flex: 1,
              marginTop: 10,
              borderColor: "#308DCC",
            }}
          />
          <View style={styles.container}>
            <Text>{t("startcity", this.state.locale)}</Text>
            <TextInput
              style={styles.textInput}
              value={this.state.start_place}
              // placeholder="ပဲခူးတိုင်း၊ကျောက်တံခါးမြို့နယ်၊ပဲနွယ်ကုန်းမြို့"
              // placeholderTextColor="black"
            />
            <Text style={{ marginTop: 5 }}>
              {t("endplace", this.state.locale)}
            </Text>
            <TextInput
              style={styles.textInput}
              value={this.state.end_place}
              // placeholder="ပျဉ်းမနား၊ပေါင်းလောင်း(၄)လမ်း။"
              // placeholderTextColor="black"
            />
          </View>
          <View
            style={{
              height: 2,
              borderWidth: 1,
              // flex: 1,
              marginTop: 15,
              borderColor: "#308DCC",
            }}
          />
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              // marginTop:10
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>{t("nrcfront", this.state.locale)}</Text>
              {/* <View
                style={{
                  height: 100,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#E3EEF5",
                  backgroundColor: "#E3EEF5",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 3,
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.5,
                  marginTop: 5,
                }}
              > */}
              <Image
                source={{
                  uri:
                    "http://128.199.79.79/Covid/public/" +
                    this.state.imagePath +
                    "/" +
                    this.state.nrcfrontName,
                }}
                style={{ width: 150, height: 150, marginTop: 5 }}
              />
              {/* </View> */}
            </View>
            <View style={{ width: "45%" }}>
              <Text>{t("nrcback", this.state.locale)}</Text>
              {/* <View
                style={{
                  height: 100,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#E3EEF5",
                  backgroundColor: "#E3EEF5",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 3,
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.5,
                  marginTop: 5,
                }}
              > */}
              <Image
                source={{
                  uri:
                    "http://128.199.79.79/Covid/public/" +
                    this.state.imagePath +
                    "/" +
                    this.state.nrcbackName,
                }}
                style={{ width: 150, height: 150, marginTop: 5 }}
              />
              {/* </View> */}
            </View>
          </View>
          {this.state.citizenstatus == 1 ? (
            <View style={{ width: "45%", marginLeft: 10, marginTop: 10 }}>
              <Text>{t("mo", this.state.locale)}</Text>
              {/* <View
              style={{
                height: 150,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#E3EEF5",
                backgroundColor: "#E3EEF5",
                justifyContent: "center",
                alignItems: "center",
                elevation: 3,
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.5,
                marginTop: 5,
              }}
            > */}
              <Image
                source={{
                  uri:
                    "http://128.199.79.79/Covid/public/" +
                    this.state.imagePath +
                    "/" +
                    this.state.moName,
                }}
                style={{ width: 150, height: 150, marginTop: 5 }}
              />
              {/* </View> */}
            </View>
          ) : null}

          <View style={{ width: "45%", marginLeft: 10, marginTop: 10 }}>
            <Text>{t("support", this.state.locale)}</Text>
            {/* <View
              style={{
                height: 150,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#E3EEF5",
                backgroundColor: "#E3EEF5",
                justifyContent: "center",
                alignItems: "center",
                elevation: 3,
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.5,
                marginTop: 5,
              }}
            > */}
            <Image
              source={{
                uri:
                  "http://128.199.79.79/Covid/public/" +
                  this.state.imagePath +
                  "/" +
                  this.state.approvephotoName,
              }}
              style={{ width: 150, height: 150, marginTop: 5 }}
            />
          </View>
          {/* <View
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginRight: 15,
            }}
          >
            {this.state.check_by ? (
              <View style={{ flexDirection: "row" }}>
                <Text>Check_by:</Text>
            <Text style={{paddingLeft:10}}>{this.state.check_by}</Text>
              </View>
            ) : null}
            {this.state.approve_by ? (
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text >Approve_by:</Text>
                <Text style={{paddingLeft:10}}>{this.state.approve_by}</Text>
              </View>
            ) : null}
          </View> */}
          {/* </View> */}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  firstText: {
    width: "35%",
  },
  secondText: {
    width: "65%",
    paddingTop: 5,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
