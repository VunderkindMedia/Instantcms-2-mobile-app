import Moment from "moment";
import "moment/locale/ru";

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
