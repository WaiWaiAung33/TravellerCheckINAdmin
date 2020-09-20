import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  BackHandler
} from "react-native";

//import components
import Header from "@components/Header";
//import services
import { t, getLang } from "@services/Localization";

export default class ToleGateCard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      locale: null
    };
    this.BackHandler=null;
  }
  async componentDidMount() {
    this.setBackHandler();
    const res = await getLang();
    this.setState({ locale: res });
  }
  setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
  }
  _handleBackButton = () => {
    this.props.navigation.navigate("ToleGate");
    return true;
  };
  UNSAFE_componentWillUnmount() {
    this.focusListener.remove();
  }
  render() {
    return (
      <View>
        <Header
          name={t("detail",this.state.locale)}
          Onpress={() => this.props.navigation.navigate("ToleGate")}
        />
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>အမည်</Text>
              <Text style={styles.secondText}>လှလှ</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>မှတ်ပုံတင်နံပါတ်</Text>
              <Text style={styles.secondText}>၇/ကတခ(နိုင်)၁၂၃၄၅၆</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>ဖုန်းနံပါတ်</Text>
              <Text style={styles.secondText}>09123456789</Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>ယာဉ်နံပါတ်</Text>
              <Text style={styles.secondText}>7K/1234</Text>
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
            <Text>စတင်ထွက်ခွာသည့်မြို့</Text>
            <TextInput
              style={styles.textInput}
              placeholder="ပဲခူးတိုင်း၊ကျောက်တံခါးမြို့နယ်၊ပဲနွယ်ကုန်းမြို့"
              placeholderTextColor="black"
            />
            <Text style={{ marginTop: 5 }}>သွားရောက်လိုသည့်နေရာ</Text>
            <TextInput
              style={styles.textInput}
              placeholder="ပျဉ်းမနား၊ပေါင်းလောင်း(၄)လမ်း။"
              placeholderTextColor="black"
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
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အရှေ့ဘက်</Text>
              <View
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
              >
                <Image source={require("@images/camera.png")} />
              </View>
            </View>
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အနောက်ဘက်</Text>
              <View
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
              >
                <Image source={require("@images/camera.png")} />
              </View>
            </View>
          </View>
          <View style={{ width: "45%", marginLeft: 10 }}>
            <Text>မှတ်ပုံတင်အနောက်ဘက်</Text>
            <View
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
            >
              <Image source={require("@images/camera.png")} />
            </View>
          </View>
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
