import { NOTIFY_USER } from "./actionType";

export const notifyAction = (Message, MessageType) => {
  return {
    type: NOTIFY_USER,
    Message,
    MessageType
  };
};
