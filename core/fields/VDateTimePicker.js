import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, Platform, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { language } from "../language";

export const VDateTimePicker = ({
  style,
  is24Hour = true,
  display = "default",
  mode = "time",
  textStyle,
  placeholder,
  buttonStyle,
  onChangeValue,
}) => {
  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(selectedDate);
    onChangeValue(date);
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
    <TouchableOpacity onPress={() => setShow(true)}>
      <View>
        <View style={style}>
          <Text style={textStyle}>
            {placeholder + ": " + date.toLocaleDateString("ru-RU", options)}
          </Text>
        </View>

        <Modal visible={show}>
          <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
            <DateTimePicker
              maximumDate={new Date()}
              testID="dateTimePicker"
              value={date}
              locale="ru-RU"
              mode={mode}
              is24Hour={is24Hour}
              display={display}
              style={{ height: "50%" }}
              onChange={onChange}
            />

            <TouchableOpacity
              onPress={() => setShow(false)}
              style={{
                alignItems: "center",
              }}
            >
              <View style={buttonStyle}>
                <Text>
                  {mode === "date"
                    ? language.field_date_picker_submit_title
                    : language.field_time_picker_submit_title}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};
