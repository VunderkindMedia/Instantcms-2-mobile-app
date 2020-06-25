import Moment from "moment";
import "moment/locale/ru";
import { TouchableHighlight, TouchableNativeFeedback } from "react-native";

export function formattingDate(strDate) {
  Moment.locale("ru");
  var date;
  date = Moment(strDate);

  if (
    Moment(new Date(date)).format("DD MMMM") ===
    Moment(new Date()).format("DD MMMM")
  ) {
    date = "Сегодня в " + Moment(strDate).format("HH:mm");
  } else {
    date = Moment(strDate).format("DD MMMM HH:mm");
  }
  return date.toString();
}

export default TouchableView =
  Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;
export function YouTubeGetID(url) {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

export function AddHttp(str) {
  if (!String(str).match(/^[a-zA-Z]+:\/\//)) {
    str = "http:" + str;
  }

  return str;
}

export function format(date, type) {
  let date_result;
  let mday = date.getDate();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  mday = mday < 10 ? `0${mday}` : mday;
  if (type === "date") {
    date_result = `${mday}.${month}.${date.getFullYear()}`;
  } else if (type === "datetime") {
    date_result = `${mday}.${month}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  } else if (type === "time") {
    date_result = `${date.getHours()}:${date.getMinutes()}`;
  }

  return date_result;
}
