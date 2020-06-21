import { notification } from "antd";

class Notification {
  /**
   * * @param {title} error tirle
   * * @param {msg} error msg
   *@notify msg
   */
  static notify(title, msg) {
    notification.open({
      message: title,
      description: msg,
    });
  }
}

export default Notification;
