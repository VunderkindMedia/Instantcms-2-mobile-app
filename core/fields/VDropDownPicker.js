import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
} from "react-native";
import { BlurView } from "expo-blur";
import { useForm, Controller, ErrorMessage } from "react-hook-form";

import PropTypes from "prop-types";

// Icon
import Feather from "react-native-vector-icons/Feather";

class VDropDownPicker extends React.Component {
  constructor(props) {
    super(props);

    let choice;

    if (
      props.defaultNull ||
      (props.hasOwnProperty("defaultValue") && props.defaultValue === null)
    ) {
      choice = this.null();
    } else if (props.defaultValue) {
      choice = props.items.find((item) => item.value === props.defaultValue);
    } else if (
      props.items.filter(
        (item) => item.hasOwnProperty("selected") && item.selected === true
      ).length > 0
    ) {
      choice = props.items.filter(
        (item) => item.hasOwnProperty("selected") && item.selected === true
      )[0];
    } else if (props.items.length > 0) {
      choice = props.items[props.defaultIndex ?? 0];
    } else {
      choice = this.null();
    }

    this.state = {
      choice: {
        label: choice.label,
        value: choice.value,
      },
      visible: false,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.defaultNull === true) {
  //     return {
  //       choice: {
  //         label: null,
  //         value: null,
  //       },
  //       visible: props.disabled ? false : state.visible,
  //     };
  //   }

  //   return null;
  // }

  null() {
    return {
      label: null,
      value: null,
    };
  }

  toggle() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  select(item, index) {
    this.setState({
      choice: {
        label: item.label,
        value: item.value,
      },
      visible: false,
    });

    this.props.defaultNull = false;

    // onChangeItem callback
    this.props.onChangeItem(item, index);
  }

  getLayout(layout) {
    this.setState({
      top: layout.height - 1,
    });
  }

  render() {
    const {
      defaultNull,
      placeholder,
      disabled,
      value,
      errors,
      errorStyle,
      message,
    } = this.props;

    const label =
      value !== undefined
        ? defaultNull && value === ""
          ? placeholder
          : value
        : defaultNull && this.state.choice.label === null
        ? placeholder
        : this.state.choice.label;
    const opacity = disabled ? 0.5 : 1;
    return (
      <View
        style={[
          this.props.style,
          errors[this.props.name] && {
            borderColor: "red",
            borderLeftWidth: 5,
          },
        ]}
      >
        <TouchableOpacity
          onLayout={(event) => {
            this.getLayout(event.nativeEvent.layout);
          }}
          disabled={disabled}
          onPress={() => this.toggle()}
          activeOpacity={1}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text disabled={true} style={[this.props.labelStyle, { opacity }]}>
            {label}
          </Text>

          {this.props.showArrow && (
            <View style={{ opacity }}>
              {!this.state.visible
                ? this.props.customArrowUp ?? (
                    <Feather name="chevron-down" size={this.props.arrowSize} />
                  )
                : this.props.customArrowDown ?? (
                    <Feather name="chevron-up" size={this.props.arrowSize} />
                  )}
            </View>
          )}
        </TouchableOpacity>
        <ErrorMessage errors={this.props.errors} name={this.props.name}>
          {({ message }) => (
            <Text style={this.props.errorStyle}>{message}</Text>
          )}
        </ErrorMessage>
        <Modal
          animationType={this.props.animation}
          transparent={true}
          visible={this.state.visible}
        >
          <BlurView intensity={90} style={{ flex: 1 }}>
            <View
              style={[
                styles.dropDownBox,

                {
                  // top: this.state.top,
                  maxHeight: this.props.dropDownMaxHeight,
                  minHeight: this.props.dropDownMinHeight,
                  zIndex: this.props.zIndex,
                },
              ]}
            >
              <ScrollView
                style={{ zIndex: this.props.zIndex }}
                nestedScrollEnabled={true}
              >
                {this.props.items.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.select(item, index)}
                    style={[
                      styles.dropDownItem,
                      this.props.itemStyle,
                      this.state.choice.value === item.value &&
                        this.props.activeItemStyle,
                    ]}
                  >
                    <Text
                      style={[
                        this.props.dropDownLabelStyle,
                        this.state.choice.value === item.value &&
                          this.props.activeLabelStyle,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </BlurView>
        </Modal>
      </View>
    );
  }
}

VDropDownPicker.defaultProps = {
  defaultNull: false,
  placeholder: "Select an item",
  dropDownMaxHeight: 180,
  dropDownMinHeight: 100,
  style: {},
  itemStyle: {},
  labelStyle: {},
  activeItemStyle: {},
  activeLabelStyle: {},

  showArrow: true,
  arrowSize: 15,
  customArrowUp: null,
  customArrowDown: null,
  zIndex: 5000,
  disabled: false,
  onChangeItem: () => {},
};

VDropDownPicker.propTypes = {
  items: PropTypes.array.isRequired,
  defaultIndex: PropTypes.number,
  defaultValue: PropTypes.any,
  defaultNull: PropTypes.bool,
  placeholder: PropTypes.string,
  dropDownMaxHeight: PropTypes.number,
  dropDownMinHeight: PropTypes.number,
  style: PropTypes.any,
  itemStyle: PropTypes.object,
  value: PropTypes.any,
  labelStyle: PropTypes.object,
  dropDownLabelStyle: PropTypes.object,
  animation: PropTypes.string,
  activeItemStyle: PropTypes.object,
  activeLabelStyle: PropTypes.object,
  showArrow: PropTypes.bool,
  arrowSize: PropTypes.number,
  customArrowUp: PropTypes.any,
  customArrowDown: PropTypes.any,
  zIndex: PropTypes.number,
  disabled: PropTypes.bool,
  onChangeItem: PropTypes.func,
};

const styles = StyleSheet.create({
  dropDownBox: {
    paddingTop: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    opacity: 0.5,
    maxHeight: "50%",
    minHeight: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  dropDownItem: {
    paddingVertical: 8,

    alignItems: "center",
  },
});

export default VDropDownPicker;
