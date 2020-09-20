import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
  Linking,
  Platform,
  ScrollView
} from "react-native";
import { Updates} from "expo";
import appjson from "@appjson";
import Loading from "@components/Loading";
//import LanguageModal
import LanguageModal from "@components/LanguageModal";
import { t, getLang } from "@services/Localization";

const axios = require("axios");
import { GetVersionApi } from "@api/Url";
import AppstoreModal from "@components/AppstoreModal";

//import consts
import { LANGUAGE } from "@consts/Const";

import { setItem } from "@services/Storage";
import { toHumanSize } from "i18n-js";

const { height, width } = Dimensions.get("window");
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: null,
      mylang: "MM",
      isOpenErrorModal: false,
      isOpenLangModal: false,
      locale: null,
      access_token: null,
      isLoading: false,
      version: null,
      link: "",
      isOpenAppModal: false,
      expoPushToken:null
    };
    this.BackHandler = null;
  }
  async componentDidMount() {
    // console.log(appjson.expo.version);
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({
      access_token: access_token,
      version: appjson.expo.version,
    });
    await this.setBackHandler();
    const res = await getLang();
    this.setState({ locale: res });
    this.getfilterVersion();
  }


  async setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
    const res = await getLang();
    this.setState({ locale: res });
  }

  _handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  UNSAFE_componentWillUnmount() {
    this.removeBackHandler();
    return true;
    // Remove the event listener before removing the screen from the stack
    // this.focusListener.remove();
  }
  async _handleLogout() {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Login");
    return true;
  }

  async handleGetLocale(locale) {
    await setItem(LANGUAGE, locale);
    this.setState({
      isOpenLangModal: false,
      mylang: locale,
    });
   Updates.reload();
  }
  getfilterVersion() {
    const self = this;
    // self.setState({ isLoading: true });
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };
    const bodyParam = {
      app_type: 2,
    };
    // console.log(headers);
    axios
      .post(GetVersionApi, bodyParam, {
        headers,
      })
      .then(function (response) {
        // console.log(response.data);
        self.setState({isLoading:false});
        if (self.state.version == response.data.forceVersion.version_name) {
          self.setState({
            // isLoading: false,
            isOpenAppModal:false
            // isOpenAppModal: true,
            // link: response.data.forceVersion.appstore_url,
          });
          // self.setState({isOpenAppModal:true,link:response.data.forceVersion.appstore_url});
          // Linking.openURL(response.data.forceVersion.appstore_url)
        }
        else {
          self.setState({isOpenAppModal:true,link:response.data.forceVersion.appstore_url});
          // Linking.openURL(response.data.forceVersion.appstore_url);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  _handleSetLocaleAsyncStorage = async () => {
    this.setState({ confirmLocaleModalOpen: false });
  };

  render() {
    // console.log(this.state.version);
    // if (this.state.isLoading) {
    //   return <Loading />;
    // }
    // console.log(this.state.access_token);
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.secondContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: 15,
              marginTop: 10,
            }}
          >
            {this.state.locale == "MM" ? (
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginRight: 5,
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => this.setState({ isOpenLangModal: true })}
                >
                  <Image
                    source={require("@images/unnamed.png")}
                    style={{ width: 25, height: 25 }}
                  />

                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      paddingLeft: 10,
                    }}
                  >
                    {this.state.mylang == "MM" ? "မြန်မာ" : "Eng"}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginRight: 5,
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => this.setState({ isOpenLangModal: true })}
                >
                  <Image
                    source={require("@images/english.png")}
                    style={{ width: 25, height: 25 }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      paddingLeft: 4,
                      paddingLeft: 10,
                    }}
                  >
                    English
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={() => this._handleLogout()}
              style={{ width: 50, alignItems: "flex-end", marginTop: 10 }}
            >
              <ImageBackground source={require("@images/elisp.png")} 
              style={{width:30,height:30,justifyContent:"center",alignItems:"center"}}>
              <Image
                source={require("@images/logout1.png")}
                style={styles.touchImg}
              />
              </ImageBackground>
            
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center" }}>
            <View style={styles.imgContainer}>
              <Image
                source={require("@images/councillogo.png")}
                style={styles.imgHeader}
              />
            </View>
          </View>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              paddingTop: 20,
              fontSize: 18,
              // fontWeight: "bold",
            }}
          >
            Welcome To Naypyidaw Traveller
          </Text>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              paddingTop: 5,
              fontSize: 18,
              // fontWeight: "bold",
            }}
          >
            Check-in
          </Text>
        </View>

        {/* <ImageBackground
          source={require("@images/path.png")}
          style={styles.img}
        >
          <Image source={require("@images/logo.png")} />
        </ImageBackground> */}
        <ScrollView>
        <View style={{ marginTop: 15 }}>
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.touchBtn, { backgroundColor: "#EBB318" }]}
            onPress={() => this.props.navigation.navigate("ToleGateList")}
          >
            <Text style={styles.text}>
              {t("tolegatelist", this.state.locale)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchBtn}
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate("Create")}
          >
            <Text style={styles.text}>
              {t("createform", this.state.locale)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.touchBtn, { backgroundColor: "#E99944" }]}
            onPress={() => this.props.navigation.navigate("ToleGateList")}
          >
            <Text style={styles.text}>
              {t("tolegatelist", this.state.locale)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.touchBtn, { backgroundColor: "#C716F1" }]}
            onPress={() => this.props.navigation.navigate("TravelNote")}
          >
            <Text style={styles.text}>
              {t("travelnote", this.state.locale)}
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          <Text>Version {appjson.expo.version}</Text>
        </View>
        <LanguageModal
          isOpen={this.state.isOpenLangModal}
          getCheckLang={(locale) => this.handleGetLocale(locale)}
          onClose={() => this.setState({ isOpenLangModal: false })}
        />
        <AppstoreModal
          isOpen={this.state.isOpenAppModal}
          onClose={() => this.setState({ isOpenAppModal: false })}
          link={this.state.link}
          OnPress={()=>this._handleLogout()}
          // OnPress={this.props.navigation.navigate(exitApp())}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4E4E4",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  img: {
    height: height / 5,
    width: width,
    justifyContent: "center",
    // alignItems: "center"
  },
  touchImg: {
    width: 15,
    height: 15,
  },
  touchBtn: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 25,
    backgroundColor: "#308DCC",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  secondContainer: {
    height: 300,
    backgroundColor: "#308DCC",
    // alignItems: "center",
  },
  imgHeader: {
    width: 110,
    height: 110,
  },
  imgContainer: {
    backgroundColor: "white",
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 65,
    marginTop: "10%",
  },
});
