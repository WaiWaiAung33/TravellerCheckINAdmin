import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from "react-native";

const axios = require("axios");
import FormData from "form-data";
import {
  RegisterHistoryDetailApi,
  GetCityApi,
  GetNrcStateApi,
  GetTownshipApi,
  BaseUrl,
  EditApi,
} from "@api/Url";

//import components
import DropDown from "@components/DropDown";
import Header from "@components/Header";
import ImgUploadBtn from "@components/ImgUploadBtn";
import SuccessModal from "@components/SuccessModal";
import Loading from "@components/Loading";
import Radio from "@components/Radio";

//import services
import { t, getLang } from "@services/Localization";

const GENDER = "GENDER";

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      township: { value: null, label: null },
      TOWNSHIP: [],
      city: { value: null, label: null },
      CITY: [],
      nrccode: { value: null, label: null },
      NRCCODE: [],
      nrcstate: { value: null, label: null },
      NRCSTATE: [],
      nrcstatus: { value: null, label: null },
      NRCSTATUS: [],
      usertype: { value: null, label: null },
      education: { value: null, label: null },
      EDUCATION: [],
      endtownship: { value: null, label: null },
      ENDTOWNSHIP: [],
      endtownshipone: { value: null, label: null },
      ENDTOWNSHIPONE: [],
      showStepOne: true,
      showStepTwo: false,
      showcheckbox: false,
      name: "",
      nrcnumber: "",
      phone: "09451875247",
      carnumber: "7K/1234",
      startplace: "ပဲနွယ်ကုန်းမြို့။",
      endplace: "",
      passport: null,
      ministraystatus: null,
      MINISTRAY: [],
      tempMinistray: [],
      endtownshipid: null,
      endtownshipname: "",
      imagePath: "",
      nrcfrontName: "",
      nrcbackName: "",
      moName: "",
      approvephotoName: "",
      isOpenSuccessModel: false,
      locale: null,
      isLoading: false,
      townshipministrayname: "",
      address: "",
      addressText: "",
      townshipministrayid: null,
      selectedData: "",
      designation: "",
      department: "",
      ministry_input: "",
    };
  }
  async componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this.setState({
        showcheckbox: false,
        townshipministrayid: this.state.townshipministrayid,
      });
    });
    const res = await getLang();
    this.setState({ locale: res });
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({
      access_token: access_token,
      usertype: { value: 0, label: t("people", this.state.locale) },
    });
    this.getAllTravelNote();
    this.getAllNrcCode();
    this.getAllNrcStatus();
    this.getAllCity();
    this.getAllEducation();
    this.getEndtownshipAll();
  }

  getAllTravelNote() {
    const self = this;
    self.setState({ isLoading: true });
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };
    let bodyParam = {
      userId: self.props.navigation.getParam("userid"),
    };
    // console.log(GetTownshipApi);
    axios
      .post(RegisterHistoryDetailApi, bodyParam, {
        headers,
      })
      .then(function (response) {
        // console.log("Register Detail", response.data.historyDetail.citizen_status);
        const citizen = response.data.historyDetail.citizen_status;
        const datas = response.data.historyDetail;
        const endtown = response.data.endplace_township;
        // alert(endtown);
        console.log(datas);
        // console.log(response.data);
        // alert(datas.ministry_status);
        if (datas.ministry_status == 1) {
          self.setState({ showcheckbox: true });
        }

        if (citizen == 0) {
          self.setState({
            usertype: { value: citizen, label: "ပြည်သူ" },
          });
        }
        if (citizen == 1) {
          self.setState({
            usertype: { value: citizen, label: "နိုင်ငံဝန်ထမ်း" },
          });
        }
        if (citizen == 2) {
          self.setState({
            usertype: { value: citizen, label: "ရဟန်းရှင်" },
          });
        }
        if (citizen == 3) {
          self.setState({
            usertype: { value: citizen, label: "တပ်မတော်" },
          });
        }
        if (citizen == 4) {
          self.setState({
            usertype: { value: citizen, label: "နိုင်ငံခြားသား" },
          });
        }
        self.setState({
          name: datas.name,
          designation: datas.designation,
          department: datas.department,
          ministry_input: datas.ministry_input,
          selectedData: datas.sex,
          nrccode: { value: datas.nrc_code_id, label: datas.nrc_code },
          nrcstate: { value: datas.nrc_status_id, label: datas.nrc_state },
          nrcstatus: { value: datas.nrc_type_id, label: datas.nrc_type },
          nrcnumber: datas.nrc_no,
          phone: datas.ph_no,
          carnumber: datas.vehical_no,
          passport: datas.passport,
          ministraystatus: datas.ministry_status,
          city: { value: datas.start_place_city, label: datas.city },
          township: {
            value: datas.start_place_township,
            label: datas.township,
          },
          startplace: datas.start_place,
          addressText: datas.end_place,
          education: { value: datas.ministry_id, label: datas.ministry },
          endtownship: { value: datas.end_place_township, label: endtown },
          townshipministrayname: endtown,
          // endtownshipone: { value: datas.end_place_township, label: endtown },
          endplace: datas.end_place,
          address: datas.ministry,
          imagePath: datas.path,
          nrcfrontName:
            "http://128.199.79.79/Covid/public/" +
            datas.path +
            "/" +
            datas.nrc_front,
          nrcbackName:
            "http://128.199.79.79/Covid/public/" +
            datas.path +
            "/" +
            datas.nrc_back,
          moName:
            "http://128.199.79.79/Covid/public/" +
            datas.path +
            "/" +
            datas.mo_photo,
          approvephotoName:
            "http://128.199.79.79/Covid/public/" +
            datas.path +
            "/" +
            datas.approve_photo,
          isLoading: false,
        });
        // console.log(citizen);
      })
      .catch(function (err) {
        self.setState({ isLoading: false });
        // console.log("TravelNoteDetail Error");
      });
  }

  _handleSave() {
    const self = this;
    // alert(self.state.endtownship.value);
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    const { nrcfrontName } = self.state;
    const { nrcbackName } = self.state;
    const { approvephotoName } = self.state;
    const { moName } = self.state;
    formData.append("citizen_status", self.state.usertype.value);
    formData.append("userId", self.props.navigation.getParam("userid"));
    formData.append("name", self.state.name);
    formData.append("nrc_code_id", self.state.nrccode.value);
    formData.append("nrc_state_id", self.state.nrcstate.value);
    formData.append("nrc_type_id", self.state.nrcstatus.value);
    formData.append("nrc_no", self.state.nrcnumber);
    formData.append("phone_no", self.state.phone);
    formData.append("vehicle_no", self.state.carnumber);
    formData.append("startcity_id", self.state.city.value);
    formData.append("starttownship_id", self.state.township.value);
    formData.append("start_place", self.state.startplace);
    formData.append("ministry_status", this.state.showcheckbox ? 1 : 0);
    formData.append(
      "designation",
      self.state.designation ? self.state.designation : ""
    );
    formData.append(
      "department",
      self.state.department ? self.state.department : null
    );
    formData.append(
      "ministry_input",
      this.state.ministry_input ? this.state.ministry_input : ""
    );
    formData.append("gender", this.state.selectedData);
    formData.append(
      "endPlace_id",
      !self.state.showcheckbox
        ? this.state.townshipministrayid
        : this.state.endtownship.value
    );
    formData.append(
      "end_place",
      self.state.showcheckbox ? self.state.address : self.state.addressText
    );
    if (nrcbackName) {
      const uriPart = nrcbackName.split(".");
      const fileExtension = uriPart[uriPart.length - 1];
      const fileName = nrcbackName.substr(nrcbackName.lastIndexOf("/") + 1);

      formData.append("nrc_back", {
        uri: nrcbackName,
        name: fileName,
        type: `image/${fileExtension}`,
      });
    }
    if (nrcfrontName) {
      const uriPart = nrcfrontName.split(".");
      const fileExtension = uriPart[uriPart.length - 1];
      const fileName = nrcfrontName.substr(nrcfrontName.lastIndexOf("/") + 1);

      formData.append("nrc_front", {
        uri: nrcfrontName,
        name: fileName,
        type: `image/${fileExtension}`,
      });
    }
    if (approvephotoName) {
      const uriPart = approvephotoName.split(".");
      const fileExtension = uriPart[uriPart.length - 1];
      const fileName = approvephotoName.substr(
        approvephotoName.lastIndexOf("/") + 1
      );

      formData.append("approved_photo", {
        uri: approvephotoName,
        name: fileName,
        type: `image/${fileExtension}`,
      });
    }
    if (moName) {
      const uriPart = moName.split(".");
      const fileExtension = uriPart[uriPart.length - 1];
      const fileName = moName.substr(moName.lastIndexOf("/") + 1);

      formData.append("mo_photo", {
        uri: moName,
        name: fileName,
        type: `image/${fileExtension}`,
      });
    }
    formData.append(
      "passport",
      self.state.passport ? self.state.passport : null
    );
    formData.append(
      "ministry_id",
      self.state.education.value ? self.state.education.value : null
    );
    console.log(formData);

    axios
      .post(EditApi, formData, {
        headers,
      })
      .then(function (response) {
        // console.log("Edit",response.data);
        // alert("Hello");
        if (response.data.status == 1) {
          self.setState({
            isOpenSuccessModel: true,
          });
        } else {
          alert(response.data.messange);
        }
      })
      .catch(function (err) {
        console.log("Edit Error", err);
      });
  }

  getAllNrcCode() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };

    console.log(headers);
    axios
      .get(GetCityApi, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data.city);
        let nrccode = response.data.NrcCode;
        let arr = [];
        nrccode.map((data, index) => {
          var obj = { value: data.id, label: data.nrc_code };
          arr.push(obj);
        });
        self.setState({ NRCCODE: arr });
      })
      .catch(function (err) {
        console.log("NRC Code Erro", err);
      });
  }

  getAllNrcStatus() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };

    // console.log(GetTownshipApi);
    axios
      .get(GetCityApi, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data);
        let nrcstatus = response.data.NrcType;
        let arr = [];
        nrcstatus.map((data, index) => {
          var obj = { value: data.id, label: data.nrc_type };
          arr.push(obj);
        });
        self.setState({ NRCSTATUS: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  getAllNrcState(nrccode) {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };
    let bodyParam = {
      nrc_code: nrccode,
    };

    // console.log(GetTownshipApi);
    axios
      .post(GetNrcStateApi, bodyParam, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data);
        let nrcstate = response.data.townships;
        let arr = [];
        nrcstate.map((data, index) => {
          var obj = { value: data.id, label: data.nrc_state };
          arr.push(obj);
        });
        self.setState({ NRCSTATE: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  getAllCity() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };

    // console.log(GetTownshipApi);
    axios
      .get(GetCityApi, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data.city);
        let city = response.data.city;
        let arr = [];
        city.map((data, index) => {
          var obj = { value: data.id, label: data.city };
          arr.push(obj);
        });
        self.setState({ CITY: arr });
      })
      .catch(function (err) {
        console.log("NRC Code Erro", err);
      });
  }

  getEndtownshipAll() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };

    // console.log(GetTownshipApi);
    axios
      .get(GetCityApi, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data);
        let endtownship = response.data.Township;
        let arr = [];
        endtownship.map((data, index) => {
          var obj = { value: data.id, label: data.township };
          arr.push(obj);
        });
        self.setState({ ENDTOWNSHIP: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  getAllEducation() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };

    // console.log(GetTownshipApi);
    axios
      .get(GetCityApi, {
        headers,
      })
      .then(function (response) {
        // console.log("Ministray",response.data);
        let education = response.data.Ministry;
        let arr = [];
        education.map((data, index) => {
          var obj = { value: data.id, label: data.ministry };
          arr.push(obj);
        });
        self.setState({ EDUCATION: arr, MINISTRAY: response.data.Ministry });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  getTownshipAll(city_id) {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };
    let bodyParam = {
      city_id: city_id,
    };
    // console.log(GetTownshipApi);
    axios
      .post(GetTownshipApi, bodyParam, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data);
        let city = response.data.townships;
        let arr = [];
        city.map((data, index) => {
          // console.log(response.data);
          var obj = { value: data.id, label: data.township };
          arr.push(obj);
        });
        self.setState({ TOWNSHIP: arr, Township: response.data.townships });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  _handleOnSelect(value, label) {
    this.setState({
      township: { value: value, label: label },
    });
  }
  _handleOnSelectCity(value, label) {
    this.setState({
      city: { value: value, label: label },
    });
    this.getTownshipAll(value);
  }
  _handleOnSelectEndTownshipOne(value, label) {
    this.setState({
      endtownshipone: { value: value, label: label },
    });
  }
  _handleOnSelectNRCCode(value, label) {
    this.setState({
      nrccode: { value: value, label: label },
    });
    this.getAllNrcState(value);
  }
  _handleOnSelectNRCState(value, label) {
    this.setState({
      nrcstate: { value: value, label: label },
    });
  }
  _handleOnSelectNRCStatus(value, label) {
    this.setState({
      nrcstatus: { value: value, label: label },
    });
  }
  _handleOnSelectUserType(value, label) {
    this.setState({
      usertype: { value: value, label: label },
    });
  }

  _handleMinistoryTownship(value) {
    // alert(value);
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };

    // console.log(GetTownshipApi);
    axios
      .get(GetCityApi, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data);
        let endtownship = response.data.Township;
        let arr = [];
        endtownship.map((data, index) => {
          // console.log("Ministray",data);
          if (value == data.id) {
            console.log("Ministry", data);
            self.setState({
              endtownshipname: data.township,
              endtownshipid: data.id,
            });
          }
          // arr.push(obj);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  searchingMinistray(word) {
    return this.state.MINISTRAY.filter((data) => {
      const ministry = data.id != null ? data.id : "";
      const ministrys = ministry.toString();
      return ministrys.toLowerCase().includes(word.toString().toLowerCase());
    });
  }

  _handleMinistoryTownship(value) {
    // alert(value);
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };

    // console.log(GetTownshipApi);
    axios
      .get(GetCityApi, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data);
        let endtownship = response.data.Township;
        let arr = [];
        endtownship.map((data, index) => {
          // console.log("Ministray",data);
          if (value == data.id) {
            // console.log("Ministry", data);
            self.setState({
              townshipministrayname: data.township,
              townshipministrayid: data.id,
            });
          }
          // arr.push(obj);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  searchingMinistray(word) {
    return this.state.MINISTRAY.filter((data) => {
      const ministry = data.id != null ? data.id : "";
      const ministrys = ministry.toString();
      return ministrys.toLowerCase().includes(word.toString().toLowerCase());
    });
  }
  _handleOnSelectEducation(value, label) {
    const self = this;
    if (value) {
      const searched = this.searchingMinistray(value);
      {
        searched.map((data, index) => {
          return this._handleMinistoryTownship(data.id);
        });
      }
    }
    self.setState({
      education: { value: value, label: label },
      address: label,
    });
    // if (value) {
    //   setTimeout(() => {
    //     const searched = this.searchingMinistray(value);
    //     this.setState({ tempMinistray: searched });
    //     this.setState({
    //       ministrayTownship: this.state.tempMinistray[0].township_id,
    //     });
    //     // console.log("TempMinistray",this.state.tempMinistray);
    //   }, 100);
    // }
    // this.setState({
    //   education: { value: value, label: label },
    // });
  }

  _handleOnSelectEndTownship(value, label) {
    this.setState({
      endtownship: { value: value, label: label },
    });
  }

  _handleOnChooseImage(image) {
    this.setState({ nrcfrontName: image.uri });
  }
  _handleOnChooseImageNrcBack(image) {
    this.setState({ nrcbackName: image.uri });
  }
  _handleOnChooseImageSupport(image) {
    this.setState({ approvephotoName: image.uri });
  }
  _handleOnChooseImageMo(image) {
    this.setState({ moName: image.uri });
  }

  _gotoStep(step) {
    if (step == 1) {
      this.setState({
        showStepOne: true,
        showStepTwo: false,
      });
    } else if (step == 2) {
      this.setState({
        showStepOne: false,
        showStepTwo: true,
      });
    }
  }
  _onChangeCheckBox() {
    this.setState({
      showcheckbox: true,
    });
  }
  _changeImage() {
    if (this.state.usertype.value == 0) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flex: 1,
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>{t("nrcfront", this.state.locale)}</Text>
              <ImgUploadBtn
                imagePath={this.state.nrcfrontName}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>{t("nrcback", this.state.locale)}</Text>
              <ImgUploadBtn
                imagePath={this.state.nrcbackName}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>{t("support", this.state.locale)}</Text>
            <ImgUploadBtn
              imagePath={this.state.approvephotoName}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
          </View>
        </View>
      );
    } else if (this.state.usertype.value == 1) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flex: 1,
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>{t("nrcfront", this.state.locale)}</Text>
              <ImgUploadBtn
                imagePath={this.state.nrcfrontName}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>{t("nrcback", this.state.locale)}</Text>
              <ImgUploadBtn
                imagePath={this.state.nrcbackName}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>{t("mo", this.state.locale)}</Text>
            <ImgUploadBtn
              imagePath={this.state.moName}
              onChooseImage={this._handleOnChooseImageMo.bind(this)}
            />
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>{t("support", this.state.locale)}</Text>
            <ImgUploadBtn
              imagePath={this.state.approvephotoName}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
          </View>
        </View>
      );
    } else if (this.state.usertype.value == 2) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flex: 1,
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>{t("religion", this.state.locale)}</Text>
              <ImgUploadBtn
                imagePath={this.state.nrcfrontName}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>{t("retligionback", this.state.locale)}</Text>
              <ImgUploadBtn
                imagePath={this.state.nrcbackName}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>{t("support", this.state.locale)}</Text>
            <ImgUploadBtn
              imagePath={this.state.approvephotoName}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
          </View>
        </View>
      );
    } else if (this.state.usertype.value == 3) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flex: 1,
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>{t("nrcfront", this.state.locale)}</Text>
              <ImgUploadBtn
                imagePath={this.state.nrcfrontName}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>{t("nrcback", this.state.locale)}</Text>
              <ImgUploadBtn
                imagePath={this.state.nrcbackName}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>{t("support", this.state.locale)}</Text>
            <ImgUploadBtn
              imagePath={this.state.approvephotoName}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flex: 1,
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>{t("forising", this.state.locale)}</Text>
              <ImgUploadBtn
                imagePath={this.state.nrcfrontName}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>{t("visa", this.state.locale)}</Text>
              <ImgUploadBtn
                imagePath={this.state.nrcbackName}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>{t("support", this.state.locale)}</Text>
            <ImgUploadBtn
              imagePath={this.state.approvephotoName}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
          </View>
        </View>
      );
    }
  }
  _onChangeCheckBox() {
    this.setState({
      showcheckbox: !this.state.showcheckbox,
    });
  }
  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
  }
  handleOnChangeRadioValue(key, value) {
    // alert(value);
    switch (key) {
      case GENDER:
        this.setState({ selectedData: value });
        break;
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    const USERTYPE = [
      { value: 0, label: t("people", this.state.locale) },
      { value: 1, label: t("goverment", this.state.locale) },
      { value: 2, label: t("bhikkhu", this.state.locale) },
      { value: 3, label: t("army", this.state.locale) },
      { value: 4, label: t("forigner", this.state.locale) },
    ];
    // alert(this.state.showcheckbox);
    // console.log(this.state.nrcfrontName);
    return (
      <View style={{ flex: 1 }}>
        {this.state.showStepOne ? (
          <View style={{ flex: 1 }}>
            <Header
              name={t("edittitle", this.state.locale)}
              number="1"
              Onpress={() => this.props.navigation.navigate("TravelNote")}
            />
            <View style={styles.constiner}>
              <KeyboardAvoidingView
                // behavior="padding"
                behavior={Platform.OS == "ios" ? "padding" : null}
                enabled
                // keyboardVerticalOffset={100}
                style={{ flex: 1 }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.text}>
                      {t("usertype", this.state.locale)}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                      <DropDown
                        placeholder="ပြည်သူ"
                        optionsContainerWidth="95%"
                        value={this.state.usertype}
                        options={USERTYPE}
                        onSelect={(value, label) =>
                          this._handleOnSelectUserType(value, label)
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.secondContainer}>
                    <Text style={styles.text}>
                      {t("name", this.state.locale)}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.name}
                      onChangeText={(value) => this.setState({ name: value })}
                    />
                  </View>

                  <View style={styles.secondContainer}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={{ paddingRight: 15 }}>
                        <Text style={styles.text}>
                          {t("gender", this.state.locale)}
                        </Text>
                      </View>
                      <View style={{ alignItems: "center" }}>
                        <Radio
                          label={t("male", this.state.locale)}
                          active={this.state.selectedData == "0" ? true : false}
                          onPress={() =>
                            this.handleOnChangeRadioValue(GENDER, "0")
                          }
                        />
                      </View>
                      <View style={{ alignItems: "center" }}>
                        <Radio
                          label={t("female", this.state.locale)}
                          active={this.state.selectedData == "1" ? true : false}
                          onPress={() =>
                            this.handleOnChangeRadioValue(GENDER, "1")
                          }
                        />
                      </View>
                    </View>
                  </View>

                  {this.state.usertype.value == 4 ? (
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>
                        {t("forino", this.state.locale)}
                      </Text>
                      <TextInput
                        style={styles.textInput}
                        value={this.state.passport}
                        onChangeText={(value) =>
                          this.setState({
                            passport: value,
                          })
                        }
                      />
                    </View>
                  ) : (
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>
                        {t("nrcno", this.state.locale)}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        <View style={{ width: "35%" }}>
                          <DropDown
                            placeholder="1"
                            optionsContainerWidth="33%"
                            value={this.state.nrccode}
                            options={this.state.NRCCODE}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCCode(value, label)
                            }
                          />
                        </View>
                        <View style={{ width: "60%" }}>
                          <DropDown
                            optionsContainerWidth="55%"
                            value={this.state.nrcstate}
                            options={this.state.NRCSTATE}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCState(value, label)
                            }
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        <View style={{ width: "35%" }}>
                          <DropDown
                            placeholder="N"
                            optionsContainerWidth="32%"
                            value={this.state.nrcstatus}
                            options={this.state.NRCSTATUS}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCStatus(value, label)
                            }
                          />
                        </View>
                        <View style={{ width: "60%" }}>
                          <TextInput
                            keyboardType="number-pad"
                            style={[styles.textInput]}
                            value={this.state.nrcnumber}
                            onChangeText={(value) =>
                              this.setState({ nrcnumber: value })
                            }
                          />
                        </View>
                      </View>
                    </View>
                  )}

                  {this.state.usertype.value == 1 ||
                  this.state.usertype.value == 3 ? (
                    <View>
                      <View style={styles.secondContainer}>
                        <Text style={styles.text}>
                          {t("designation", this.state.locale)}
                        </Text>
                        <TextInput
                          style={styles.textInput}
                          value={this.state.designation}
                          onChangeText={(value) =>
                            this.setState({
                              designation: value,
                            })
                          }
                        />
                      </View>
                      <View style={styles.secondContainer}>
                        <Text style={styles.text}>
                          {t("department", this.state.locale)}
                        </Text>
                        <TextInput
                          style={styles.textInput}
                          value={this.state.department}
                          onChangeText={(value) =>
                            this.setState({
                              department: value,
                            })
                          }
                        />
                      </View>
                      <View style={styles.secondContainer}>
                        <Text style={styles.text}>
                          {t("ministry_name", this.state.locale)}
                        </Text>
                        <TextInput
                          style={styles.textInput}
                          value={this.state.ministry_input}
                          onChangeText={(value) =>
                            this.setState({
                              ministry_input: value,
                            })
                          }
                        />
                      </View>
                    </View>
                  ) : null}

                  <View style={styles.secondContainer}>
                    <Text style={styles.text}>
                      {t("phone", this.state.locale)}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.phone}
                      editable={false}
                    />
                  </View>
                  <View style={styles.secondContainer}>
                    <Text style={styles.text}>
                      {t("vehical", this.state.locale)}
                    </Text>
                    <TextInput
                      value={this.state.carnumber}
                      style={styles.textInput}
                      onChangeText={(value) =>
                        this.setState({ carnumber: value })
                      }
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.touchBtn}
                    onPress={() => this._gotoStep(2)}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {t("gotostep", this.state.locale)}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.footer}>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      1 of 2
                    </Text>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </View>
        ) : null}

        {this.state.showStepTwo ? (
          <View style={{ flex: 1 }}>
            <Header
              name={t("edittitle", this.state.locale)}
              number="2"
              Onpress={() => this._gotoStep(1)}
            />
            <View style={styles.constiner}>
              <KeyboardAvoidingView
                // behavior="padding"
                behavior={Platform.OS == "ios" ? "padding" : null}
                enabled
                // keyboardVerticalOffset={100}
                style={{ flex: 1 }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View>
                    <View tyle={styles.secondContainer}>
                      <Text style={styles.text}>
                        {t("startcity", this.state.locale)}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        <View style={{ width: "48%" }}>
                          <DropDown
                            value={this.state.city}
                            options={this.state.CITY}
                            onSelect={(value, label) =>
                              this._handleOnSelectCity(value, label)
                            }
                            optionsContainerWidth="45%"
                          />
                        </View>
                        <View style={{ width: "48%" }}>
                          <DropDown
                            optionsContainerWidth="45%"
                            value={this.state.township}
                            options={this.state.TOWNSHIP}
                            onSelect={(value, label) =>
                              this._handleOnSelect(value, label)
                            }
                          />
                        </View>
                      </View>
                      <TextInput
                        style={[styles.textInput]}
                        value={this.state.startplace}
                        onChangeText={(value) =>
                          this.setState({ startplace: value })
                        }
                      />
                    </View>
                    <View tyle={styles.secondContainer}>
                      <Text style={styles.text}>
                        {t("endplace", this.state.locale)}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {this.state.showcheckbox ? (
                          <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                              onPress={() => this._onChangeCheckBox()}
                              style={{ marginTop: 5 }}
                            >
                              <View
                                style={{
                                  width: 25,
                                  height: 25,
                                  borderWidth: 1,
                                  backgroundColor: "#308DCC",
                                  borderColor: "#308DCC",
                                  // flexDirection:"row"
                                }}
                              >
                                <Image
                                  source={require("@images/true.png")}
                                  style={{ width: 20, height: 20 }}
                                />
                              </View>
                              {/* <View style={{ justifyContent: "center" }}>
                              <Text>{t("ministray", this.state.locale)}</Text>
                            </View> */}
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                              onPress={() => this._onChangeCheckBox()}
                              style={{ marginTop: 5 }}
                            >
                              <View
                                style={{
                                  width: 25,
                                  height: 25,
                                  borderWidth: 1,
                                }}
                              />
                            </TouchableOpacity>
                            <View style={{ justifyContent: "center" }}>
                              <Text style={{ paddingLeft: 10 }}>
                                {t("ministray", this.state.locale)}
                              </Text>
                            </View>
                          </View>
                        )}

                        {this.state.showcheckbox ? (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{ justifyContent: "center" }}>
                              <Text>{t("ministray", this.state.locale)}</Text>
                            </View>

                            <View style={{ width: "70%", marginTop: 10 }}>
                              <DropDown
                                placeholder="ဝန်ကြီးဌာန"
                                optionsContainerWidth="55%"
                                value={this.state.education}
                                options={this.state.EDUCATION}
                                onSelect={(value, label) =>
                                  this._handleOnSelectEducation(value, label)
                                }
                              />
                            </View>
                          </View>
                        ) : null}
                      </View>
                      {this.state.showcheckbox ? (
                        <View style={{ marginTop: 10 }}>
                          <TextInput
                            style={[styles.textInput]}
                            value={this.state.townshipministrayname}
                          />
                        </View>
                      ) : (
                        <View style={{ marginTop: 10 }}>
                          <DropDown
                            placeholder="Select Township"
                            optionsContainerWidth="95%"
                            value={this.state.endtownship}
                            options={this.state.ENDTOWNSHIP}
                            onSelect={(value, label) =>
                              this._handleOnSelectEndTownship(value, label)
                            }
                          />
                        </View>
                      )}

                      {this.state.showcheckbox ? (
                        <TextInput
                          style={[styles.textInput]}
                          value={this.state.address}
                          placeholder="လိပ်စာ"
                          // onChangeText={(value) =>
                          //   this.setState({ endplace: value })
                          // }
                        />
                      ) : (
                        <View>
                          <TextInput
                            style={[styles.textInput]}
                            value={this.state.addressText}
                            placeholder="လိပ်စာ"
                            onChangeText={(value) =>
                              this.setState({
                                addressText: value,
                                ISERRORENDPLACE: false,
                              })
                            }
                          />
                        </View>
                      )}
                    </View>
                  </View>
                  {this._changeImage()}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    {/* <TouchableOpacity
                      style={[styles.touchBtn, { width: "45%" }]}
                      onPress={() => this._gotoStep(1)}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        အသစ်ထည့်မည်
                      </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={[styles.touchBtn, { flex: 1 }]}
                      onPress={() => this._handleSave()}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        {t("save", this.state.locale)}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.footer}>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      2 of 2
                    </Text>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
              <SuccessModal
                isOpen={this.state.isOpenSuccessModel}
                text={t("editsuccess", this.state.locale)}
                onClose={() => this._handleOnClose()}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  constiner: {
    flex: 1,
    margin: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  textInput: {
    marginTop: 5,
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    borderColor: "#707070",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  secondContainer: {
    marginTop: 10,
    // flex: 1,
  },

  touchBtn: {
    padding: 10,
    backgroundColor: "#308DCC",
    marginTop: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginTop: 20,
    // backgroundColor:"red",
    flex: 1,
  },
  imgContainer: {
    width: "45%",
    height: 100,
    backgroundColor: "#E3EEF5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
  },
});
