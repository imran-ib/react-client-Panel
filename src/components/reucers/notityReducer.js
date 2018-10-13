import { NOTIFY_USER } from "../actions/types";

const initialState = {
  Message: null,
  MessageType: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        Message: action.Message,
        MessageType: action.MessageType
      };
    default:
      return state;
  }
}
