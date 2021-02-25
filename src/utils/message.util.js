import { Message } from "element-ui";

const MessageUtils = {
  success(msg, duration) {
    return Message({
      type: "success",
      message: msg,
      duration
    });
  }
};
export default MessageUtils;
