import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  BackHandler
} from "react-native";

//import services
import { t, getLang } from "@services/Localization";

export default class LanguageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      local: "",
    };
    this.BackHandler=null;
  }
  async componentDidMount(){
    await this.setBackHandler();
  }
  async setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
  }

  _handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  UNSAFE_componentWillUnmount() {
    this.removeBackHandler();
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
  }
  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  _handleLanguage(){
    Linking.openURL(this.props.link);
  }
  _onPress(){
    if(this.props.OnPress){
        this.props.OnPress();
    }
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
                 App Version
                </Text>
              </View>
              {/* <TouchableOpacity
                onPress={() => this.close()}
                style={styles.closeBtn}
              >
                <Image
                  source={require("@images/cross.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity> */}
            </View>
            <View style={styles.chooseLangContainer}>
              <TouchableOpacity
                onPress={() => this._handleLanguage()}
                style={{
                  backgroundColor:"#E5DEDE",
                  marginBottom:15
                }}
              >
                <View style={styles.myanmarCheck}>
                  <Image source={require("@images/app.png")} style={{width:20,height:20}} />
                  <Text style={{paddingLeft:10}}>Download from App Store</Text>
                </View>
              </TouchableOpacity>
           
            </View>
            <View style={{borderWidth:1,width:"100%",height:2,backgroundColor:"#000"}}/>
            <View style={{justifyContent:"center",alignItems:"center",marginBottom:15}}>
                <TouchableOpacity style={{width:80,height:35,
                    backgroundColor:"#308DCC",marginTop:10,justifyContent:"center",
                    alignItems:"center",borderWidth:1,borderColor:"#308DCC",borderRadius:5
                    }}
                    onPress={()=>this._onPress()}
                    >
                    <Text style={{color:"#ffffff"}}>Exit</Text>
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
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
});
