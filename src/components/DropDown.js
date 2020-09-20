import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

export default class DropDown extends React.Component {
  handleOnSelect(value, label) {
    if (this.props.onSelect) {
      this.props.onSelect(value, label);
    }
  }

  _renderMenuOptions() {
    let optionsArray = [];
    if (this.props.options) {
      if (this.props.options.length > 0) {
        this.props.options.forEach((data, index) => {
          optionsArray.push(
            <MenuOption
              disabled={this.props.value.value == data.value ? true : false}
              key={index}
              value={data}
              text={data.label}
              customStyles={{ backgroundColor: "red" }}
            />
          );
        });
      }
    }
    return optionsArray;
  }

  _renderMenuTrigger() {
    const placeholder = this.props.placeholder
      ? this.props.placeholder
      : "Select action";
    const selectedText = this.props.value.label
      ? styles.activeText
      : styles.inactiveText;
    return (
      <MenuTrigger customStyles={triggerStyles}>
        <Text style={[styles.triggerText, selectedText]}>
          {this.props.value.label ? this.props.value.label : placeholder}
        </Text>
        <View style={styles.downArrowIconWrapper}>
          <Image
            style={styles.downArrow}
            source={require("@images/down-arrow.png")}
          />
        </View>
      </MenuTrigger>
    );
  }

  render() {
    return (
      <View>
        <Menu
          onSelect={({ value, label }) => this.handleOnSelect(value, label)}
        >
          {this._renderMenuTrigger()}
          <MenuOptions
            customStyles={menuOptionsStyles}
            optionsContainerStyle={{
              maxHeight: Dimensions.get("window").height,
              width: this.props.optionsContainerWidth
                ? this.props.optionsContainerWidth
                : null,
              marginTop: this.props.marginTop ? this.props.marginTop : 0,
            }}
          >
            <ScrollView>{this._renderMenuOptions()}</ScrollView>
          </MenuOptions>
        </Menu>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  downArrowIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  triggerText: {
    flex: 1,
    fontSize: 14,
    margin: 10,
    color:"#7A7171"
  },
  activeText: {
    color: "black",
  },
  //   inactiveText: {
  //     color: Colors.placeholder
  //   },
  downArrow: {
    width: 10,
    height: 10,
  },
});

const triggerStyles = {
  triggerWrapper: {
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    minHeight: 40,
  },
};

const menuOptionsStyles = {
  optionsWrapper: {},
  optionWrapper: {
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  OptionTouchableComponent: TouchableOpacity,
  optionTouchable: {
    activeOpacity: 0.3,
  },
  optionText: {
    margin: 5,
    fontSize: 14,
  },
};
