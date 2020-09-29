import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
  AsyncStorage,
} from "react-native";
const { width } = Dimensions.get("window");
const axios = require("axios");
import { DashboardApi } from "@api/Url";
import Header from "@components/Header";
//import services
import { t, getLang } from "@services/Localization";

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: true,
      total: null,
      locale: null,
    };
  }
  async componentDidMount() {
    const res = await getLang();
    this.setState({ locale: res });
    await this.getAllCategory();
  }
  async getAllCategory() {
    const self = this;
    const access_token = await AsyncStorage.getItem("access_token");
    axios
      .get(DashboardApi, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data.pluscase);
        const count = response.data.pluscase;

        // count.map(data,)
        self.setState({ data: response.data.pluscase, refreshing: false });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: true,
    });
    this.getAllCategory();
  };
  render() {
    // console.log(this.state.total);
    return (
      <View style={styles.container}>
        <Header
          name={t("pluscase", this.state.locale)}
          Onpress={() => this.props.navigation.navigate("Home")}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          <Text style={{ textAlign: "center" }}>
            {t("totalpaitent", this.state.locale)} :
          </Text>
          <View style={styles.btnContainer}>
            {this.state.data.map((data, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={[
                      styles.cardBtn,
                      {
                        borderColor: data.color_code,
                        backgroundColor: data.color_code,
                      },
                    ]}
                    onPress={() => this.props.navigation.navigate("PlusCaseList",{township:data.tsh_mm,total:data.count})}
                  >
                    <View
                      style={{
                        borderBottomWidth: 1,
                        padding: 10,
                        borderBottomColor: "#ffffff",
                      }}
                    >
                      <Text
                        style={[styles.textheader, { textAlign: "center" }]}
                      >
                        {data.tsh_en}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.text}>
                        {t("total", this.state.locale)}
                      </Text>
                      <Text style={[styles.text, { paddingLeft: 10, flex: 1 }]}>
                        :{data.count}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.text}>
                        {t("male", this.state.locale)}
                      </Text>
                      <Text style={[styles.text, { paddingLeft: 10, flex: 1 }]}>
                        :{data.male_count}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.text}>
                        {t("female", this.state.locale)}
                      </Text>
                      <Text style={[styles.text, { paddingLeft: 10, flex: 1 }]}>
                        :{data.female_count}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btnContainer: {
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  textheader: {
    color: "#ffffff",
  },
  text: {
    color: "#ffffff",
    fontSize: 15,
    paddingLeft: 10,
    flex: 1,
  },
  cardBtn: {
    width: width / 2 - 30,
    height: width / 2 - 30,
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 5,
    borderStyle: "solid",
    // borderColor: "#787878",
    borderWidth: 1,
    margin: 5,
    // elevation: 10,
    // backgroundColor: "white",
    shadowColor: "#787878", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.5, // IOS,
  },
});
