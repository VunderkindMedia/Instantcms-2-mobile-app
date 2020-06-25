import React, { useState } from "react";

import { View, Text, Platform, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { language } from "../language";
import { format } from "../../utils/utils";

import DateTimePickerModal from "react-native-modal-datetime-picker";

export const CancelButton = () => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Text>Cancel</Text>
    </TouchableOpacity>
  );
};

export const VDateTimePicker = ({
  style,
  is24Hour = true,
  display = "default",
  mode = "time",
  textStyle,
  pickerContainerStyle,
  cancelBtnTextColor,
  confirmBtnTextColor,
  pickerStyle,
  maximumDate,
  minimumDate,
  placeholder,
  locale,
  onChangeValue,
  backgroundCancelBtn,
}) => {
  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    onChangeValue(selectedDate);
    setShow(Platform.OS === "ios");

    setDate(selectedDate);

    setShow(false);
  };

  function calcDate(date1, date2) {
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);

    var message = "";

    message += years;

    return message;
  }

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <View style={style}>
      <TouchableOpacity
        style={{ height: "100%", width: "100%", justifyContent: "center" }}
        onPress={() => setShow(true)}
      >
        <Text style={textStyle}>
          {placeholder + ": " + date.toLocaleDateString("RU-ru", options)}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        is24Hour={is24Hour}
        isVisible={show}
        cancelTextIOS={language.btn_cancel}
        confirmTextIOS={language.btn_accept}
        headerTextIOS={language.date_picker_header}
        pickerContainerStyleIOS={pickerContainerStyle}
        locale={locale}
        date={date}
        mode={mode}
        style={pickerStyle}
        display={display}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        isDarkModeEnabled={false}
        onConfirm={(date) => onChange(date)}
        onCancel={() => setShow(false)}
        backgroundCancelBtn={backgroundCancelBtn}
        cancelBtnTextColor={cancelBtnTextColor}
        confirmBtnTextColor={confirmBtnTextColor}
      />
    </View>
  );
};
