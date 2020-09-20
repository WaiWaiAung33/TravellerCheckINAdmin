import React from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  AsyncStorage,
} from "react-native";
import DatePicker from "react-native-datepicker";
import Moment from "moment";
//import components
import DropDown from "@components/DropDown";
import TravelNoteCard from "@components/TravelNoteCard";
import Header from "@components/Header";
import Loading from "@components/Loading";
//import styles
import Style from "@styles/Styles";
const { width, height } = Dimensions.get("window");

//import api
const axios = require("axios");
import { RegisterHistoryApi } from "@api/Url";
import TravelNoteApi from "@api/TravelNoteApi";

//import services
import { t, getLang } from "@services/Localization";

export default class TravelNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: { value: null, label: null },
      isLoading: false,
      refreshing: false,
      isFooterLoading: false,
      data: [],
      tempData: [],
      searchTravel: [],
      isSearched: false,
      arrIndex: null,
      changestartDate: null,
      changeendDate: null,
      statusname: null,
      qStatus: 0,
      usertype: "",
      locale: null,
      user_id: null,
      access_token: null,
    };
    this.BackHandler = null;
    this.page = 1;
    this.TravelNoteApi = new TravelNoteApi();
  }
  async componentDidMount() {
    const { navigation } = this.props;
    const res = await getLang();
    this.setState({ locale: res });
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this._getNewDate();
    });
    const userid = await AsyncStorage.getItem("userid");
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({
      user_id: userid,
      access_token: access_token,
      // status: { value: 0, label:t("all",this.state.locale) },
    });
    this.setBackHandler();
    await this._getNewDate();
    await this.getAllTravelNote(this.page);
    // this.setState({isLoading:true})
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
  async _getNewDate() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = dd + "-" + mm + "-" + yyyy;
    this.setState({
      changestartDate: today,
      changeendDate: today,
    });
  }

  getAllTravelNote = async (page) => {
    // alert(this.state.changestartDate);
    // console.log(getCustomersapi);
    if (this.state.isSearched) {
      this.setState({
        data: [],
        isSearched: false,
      });
    }
    var access_token = await AsyncStorage.getItem("access_token");
    var user_id = await AsyncStorage.getItem("userid");
    var self = this;
    let bodyParam = {
      start_date: self.state.changestartDate,
      end_date: self.state.changeendDate,
      page: page,
      userId: user_id,
      status: "all",
    };
    axios
      .post(RegisterHistoryApi, bodyParam, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data.history.data);
        self.setState({
          data: [...self.state.data, ...response.data.history.data],
          refreshing: false,
          // statusname:response.data.history.data.status,
          // qStatus:response.data.history.data.q_status,
          isLoading: false,
          isFooterLoading: false,
          tempData: response.data.history.data,
        });
      })
      .catch(function (err) {
        // alert("Error");
        self.setState({
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
        });
        // console.log("Customer Error", err);
      });
  };

  _handleSearch(page, status, statusid, startdate, enddate) {
    // alert(status);
    this.state.data = [];
    const self = this;
    self.setState({ isSearched: true });
    let bodyParam = {
      userId: self.state.user_id,
      status: status,
      start_date: startdate,
      end_date: enddate,
      page: page,
      q_status: statusid,
    };
    // console.log("bodyParam",bodyParam);
    axios
      .post(RegisterHistoryApi, bodyParam, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data.history.data);
        self.setState({
          data: [...self.state.data, ...response.data.history.data],
          // searchTravel: response.data.history.data,
        });
      })
      .catch(function (err) {
        // alert("Error");
        self.setState({
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
        });
        // console.log("Customer Error", err);
      });
  }
  _hadleChangeUserType(status) {
    // alert(status);
    if (status == 0) {
      this.setState({
        usertype: "all",
        qStatus: 0,
      });
    } else if (status == 1) {
      this.setState({
        usertype: "1",
        qStatus: 0,
      });
    } else if (status == 2) {
      this.setState({
        usertype: "2",
        qStatus: 0,
      });
    } else if (status == 3) {
      this.setState({
        usertype: "3",
        qStatus: 0,
      });
    } else if (status == 4) {
      this.setState({
        usertype: "3",
        qStatus: 1,
      });
    } else {
      this.setState({
        usertype: "4",
        qStatus: 0,
      });
    }
    // alert("Status"+status+"qStatus"+this.state.qStatus)
  }

  _handleOnSelect(value, label) {
    this.setState({
      status: { value: value, label: label },
    });

    this._hadleChangeUserType(value);
  }
  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: false, // start top loading
    });
    this.page = 1;
    this.getAllTravelNote(this.page);
  };
  _hadleChangeDate(date) {
    this.setState({ changestartDate: date });
    // alert(this.state.changestartDate)
  }

  renderFilter() {
    const STATUS = [
      { value: 0, label: t("all", this.state.locale) },
      { value: 1, label: t("allow", this.state.locale) },
      { value: 2, label: t("tofix", this.state.locale) },
      { value: 3, label: t("approve", this.state.locale) },
      { value: 4, label: t("quartine", this.state.locale) },
      { value: 5, label: t("cancelregister", this.state.locale) },
    ];
    return (
      <View>
        <View style={styles.secondContainer}>
          <DatePicker
            date={this.state.changestartDate}
            mode="date"
            format="DD-MM-YYYY"
            // maxDate={Moment().endOf("day").toDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require("@images/calendar.png")}
            style={Style.datePickerContainer}
            customStyles={{
              dateIcon: Style.datePickerDateIcon,
              dateInput: Style.datePickerDateInput,
              dateText: Style.datePickerDateText,
            }}
            onDateChange={(date) => this._hadleChangeDate(date)}
          />
          <DatePicker
            date={this.state.changeendDate}
            mode="date"
            format="DD-MM-YYYY"
            maxDate={Moment().endOf("day").toDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require("@images/calendar.png")}
            style={Style.datePickerContainer}
            customStyles={{
              dateIcon: Style.datePickerDateIcon,
              dateInput: Style.datePickerDateInput,
              dateText: Style.datePickerDateText,
            }}
            onDateChange={(date) => this.setState({ changeendDate: date })}
          />
        </View>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "65%" }}>
            <DropDown
              value={this.state.status}
              options={STATUS}
              optionsContainerWidth="60%"
              onSelect={(value, label) => this._handleOnSelect(value, label)}
            />
          </View>
          <View style={{ width: "30%" }}>
            <TouchableOpacity
              style={styles.touchBtn}
              onPress={() =>
                this._handleSearch(
                  this.page,
                  this.state.usertype,
                  this.state.qStatus,
                  this.state.changestartDate,
                  this.state.changeendDate
                )
              }
            >
              <Image source={require("@images/search.png")} />
              <Text style={styles.text}>{t("search", this.state.locale)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading
    if (this.state.isFooterLoading) {
      return <ActivityIndicator size="large" style={{ color: "#000" }} />;
    } else {
      return null;
    }
  };

  //retrieve More data
  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.page = this.page + 1; // increase page by 1
    this.getAllTravelNote(this.page); // method for API call
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          // backgroundColor: "#607D8B",
        }}
      />
    );
  };
  _handleTravelNoteDetail(arrIndex, item) {
    // console.log(item);
    if (arrIndex == 1 && item.status == 2) {
      this.props.navigation.navigate("Edit", { userid: item.id });
    } else if (arrIndex == 1 && item.status == 1) {
      this.props.navigation.navigate("TravelQr", { data: item });
    } else if (arrIndex == 1) {
      this.props.navigation.navigate("TravelNoteDetail", { userid: item.id,backRoute:"TravelNote" });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    var { isSearched, data } = this.state;
    // var dataList = isSearched ? searchTravel : data;
    var dataList = data;

    // console.log(data);

    return (
      <View style={styles.container}>
        <Header
          name={t("travelnote", this.state.locale)}
          Onpress={() => this.props.navigation.navigate("Home")}
        />
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataList}
          // extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            // console.log(item),
            <View style={{ marginTop: 5 }}>
              <TravelNoteCard
                name={item.name}
                date={Moment(item.created_at).format("DD-MM-YYYY")}
                phone={item.ph_no}
                passportNo={item.passport}
                nrcstatus={item.citizen_status}
                statusname={item.status}
                q_statusColor={item.q_status}
                nrc={
                  item.nrc_code +
                  "/" +
                  item.nrc_state +
                  "(" +
                  item.nrc_type +
                  ")" +
                  item.nrc_no
                }
                OnPress={() => this._handleTravelNoteDetail(1, item)}
                arrIndex={1}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={this.renderFilter.bind(this)}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          onEndReached={() => (!isSearched ? this.handleLoadMore() : {})}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondContainer: {
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
  },
  touchBtn: {
    backgroundColor: "#308DCC",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
  },
  text: {
    color: "white",
  },
});
