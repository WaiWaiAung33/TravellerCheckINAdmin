import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "@components/Header";

//import Service
import { openGoogleMap } from "@services/Map";

//import services
import { t, getLang } from "@services/Localization";
import Moment from "moment";

export default class Pluscasedetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locael: null,
    };
  }
  async componentDidMount() {
    const res = await getLang();
    this.setState({
      locael: res,
    });
  }
  _handleMap() {
    openGoogleMap(
      this.props.navigation.getParam("datas").location_lat,
      this.props.navigation.getParam("datas").location_long
    );
  }
  render() {
    const data = this.props.navigation.getParam("datas");
    // console.log(data);
    return (
      <View style={styles.container}>
        <Header
          name={t("pluscasedetail", this.state.locael)}
          Onpress={() => this.props.navigation.navigate("PlusCaseList")}
        />
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{ flexDirection: "row", borderBottomWidth: 1, margin: 5 }}
          >
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>Case Id</Text>
              <Text>{t("name", this.state.locael)}</Text>
              <Text>{t("age", this.state.locael)}</Text>
              <Text>{t("gender", this.state.locael)}</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>{data.case_id}</Text>
              <Text>{data.name}</Text>
              <Text style={{ paddingTop: 5 }}>{data.age}</Text>
              <Text style={{ paddingTop: 10 }}>{data.sex}</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", borderBottomWidth: 1, margin: 5 }}
          >
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>Lab Tested Date</Text>
              <Text style={{ paddingTop: 5 }}>Lab Result</Text>
              <Text style={{ paddingTop: 5, paddingBottom: 5 }}>
                Announced Date
              </Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>{Moment(data.lab_tested_date).format("DD-MM-YYYY")}</Text>
              <Text style={{ paddingTop: 5 }}>{data.lab_result}</Text>
              <Text style={{ paddingTop: 5, paddingEnd: 5 }}>
                {Moment(data.announced_date).format("DD-MM-YYYY")}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>Occupation</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>{data.occupation}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", borderBottomWidth: 1, margin: 5 }}
          >
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>Nationality</Text>
              <Text>Parament Townnship</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>{data.national}</Text>
              <Text>{data.peranent_township}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", borderBottomWidth: 1, margin: 5 }}
          >
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>Full Address</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>{data.full_address}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 5, marginRight: 5 }}>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>Current Location</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>{data.current_location}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 5, marginRight: 5 }}>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>Disease Contact</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text>{data.disease_contact}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 5,
              marginRight: 5,
              borderBottomWidth: 1,
            }}
          >
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>Contact By</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>{data.contact_by}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", margin: 5, borderBottomWidth: 1 }}
          >
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>Travel History</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>{data.travel_history}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 5, marginRight: 5 }}>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>Hospital Name</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>{data.hospital_name}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 5, marginRight: 5 }}>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>Type</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>{data.type}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 5,
              marginRight: 5,
              borderBottomWidth: 1,
            }}
          >
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>Current status</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>{data.current_status}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", margin: 5, borderBottomWidth: 1 }}
          >
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>Remark</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>{data.remark}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>Tags</Text>
            </View>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ paddingBottom: 5 }}>{data.tags}</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", margin: 5 }}
              onPress={() => this._handleMap()}
            >
              <Image source={require("@images/map.png")} />
              <Text style={{ paddingLeft: 5 }}>Location</Text>
            </TouchableOpacity>
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
});
