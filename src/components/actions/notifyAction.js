import { NOTIFY_USER } from "./types";

export const notifyAction = (Message, MessageType) => {
  return {
    type: NOTIFY_USER,
    Message,
    MessageType
  };
};
