import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

//import services
import { t, getLang } from "@services/Localization";

export default class ToleGateCard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      locale: null,
    }
  }
  async componentDidMount(){
    const res = await getLang();
    this.setState({ locale: res });
  }
  _OnPress() {
    if (this.props.OnPressCard) {
      this.props.OnPressCard();
    }
  }
  NrcFilter() {
    if (this.props.cityzien == 2) {
      return t("religionNo",this.state.locale);
    } else if (this.props.cityzien == 4) {
      return t("forino",this.state.locale);
    } else {
      return t("nrcno",this.state.locale);
    }
  }
  _showNRCText() {
    if (this.props.cityzien == 4) {
      return this.props.passportNo;
    } else {
      return this.props.nrc;
    }
  }
  render() {
    console.log(this.props.cityzien);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._OnPress()} activeOpacity={0.8}>
          <View>
            <Text style={{ textAlign: "right", fontWeight: "bold" }}>
              {this.props.date}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>
                {this.props.cityzien == 2 ? t("Bhikkhuname",this.state.locale) : t("name",this.state.locale)}
              </Text>
              <Text style={styles.secondText}>{this.props.name}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>{this.NrcFilter()}</Text>
              <Text style={styles.secondText}>
                {this._showNRCText()}
                {/* {this.props.nrc ? this.props.nrc : this.props.passportNo} */}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>{t("phone",this.state.locale)}</Text>
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
    // borderColor: "#308DCC",
    borderRadius: 5,
  },
  firstText: {
    width: "35%",
  },
  secondText: {
    width: "65%",
  },
});
