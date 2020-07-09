import React, { useState } from "react";

import { View, Text, Platform, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { language } from "../language";
import { useForm, Controller, ErrorMessage } from "react-hook-form";

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
  errors,
  name,
  errorStyle,
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
    <View
      style={[
        style,
        errors[name] && {
          borderColor: "red",
          borderLeftWidth: 5,
        },
      ]}
    >
      <TouchableOpacity
        style={{ height: "100%", width: "100%", justifyContent: "center" }}
        onPress={() => setShow(true)}
      >
        <Text style={textStyle}>
          {placeholder + ": " + date.toLocaleDateString("RU-ru", options)}
        </Text>
      </TouchableOpacity>
      <ErrorMessage errors={errors} name={name}>
        {({ message }) => <Text style={errorStyle}>{message}</Text>}
      </ErrorMessage>
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
