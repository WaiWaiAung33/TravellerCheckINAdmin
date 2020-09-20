import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";

//import services
import { t, getLang } from "@services/Localization";

export default class LanguageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languagecolor: null,
      local: "",
      backstausmyanmar: false,
      mmCheck: false,
      enCheck: false,
      locale: null,
      isCheck: false,
      mmcolor:"",
      encolor:""
    };
  }
  async componentWillMount() {
    const res = await getLang();
    if (res == "MM") {
      this.setState({
        mmCheck: true,
      
      });
    } else {
      this.setState({
        enCheck: true,
      
      });
    }
  }
  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  _handleLanguage(locale) {
    if (locale === "MM") {
      this.setState({
        mmCheck: true,
        enCheck: this.state.enCheck,
        local: "ဘာသာစကားရွေးချယ်ရန်",
        // mmcolor:"#E5DEDE"
      });
    }

    if (locale === "EN") {
      this.setState({
        mmCheck: false,
        enCheck: true,
        local: "Choose to Language",
        // encolor:"#E5DEDE"
      });
    }

    if (this.props.getCheckLang) {
      this.props.getCheckLang(locale);
    }
  }
  async componentDidMount() {
    const res = await getLang();
    this.setState({ locale: res });
  }
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  backgroundColor: "#308DCC",
                }}
              >
                <Text
                  style={{ paddingTop: 10, paddingBottom: 10, color: "white" }}
                >
                  {this.state.local ? this.state.local : "ဘာသာစကားရွေးချယ်ရန်"}
                </Text>
                {/* <Image
                  source={require("@images/language_icon.png")}
                  style={styles.modalimg}
                /> */}
              </View>
              <TouchableOpacity
                onPress={() => this.close()}
                style={styles.closeBtn}
              >
                <Image
                  source={require("@images/iosclose.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.chooseLangContainer}>
              <TouchableOpacity
                onPress={() => this._handleLanguage("MM")}
                style={{
                  backgroundColor: this.state.mmCheck
                    ?"#E5DEDE"
                    : "#ffffff",
                }}
              >
                <View style={styles.myanmarCheck}>
                  <Image source={require("@images/unnamed.png")} />
                  <Text>မြန်မာ</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this._handleLanguage("EN")}
                style={{
                  backgroundColor: this.state.enCheck 
                    ? "#E5DEDE"
                    : "#ffffff",
                    marginBottom:30
                }}
              >
                <View style={styles.englishCheck}>
                  <Image
                    source={require("@images/english.png")}
                    style={{ width: 30, height: 30, marginLeft: 5 }}
                  />
                  <Text style={{ paddingLeft: 5 }}>English</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    backgroundColor: "#fff",
    width: 300,
    height: null,
    borderRadius: 10,
    overflow: "hidden",
  },
  modalimg: {
    width: 35,
    height: 35,
    marginTop: 10,
    marginBottom: 10,
  },
  chooseLangContainer: {
    marginTop: 10,
    paddingTop: 10,
  },
  myanmarCheck: {
    flexDirection: "row",
    padding: 10,
  },
  englishCheck: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    // justifyContent:"center",
    // flex:1,
  },
  closeBtn: {
    position: "absolute",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    marginTop:5
  },
  closeIcon: {
    width: 18,
    height: 18,
  },
});
