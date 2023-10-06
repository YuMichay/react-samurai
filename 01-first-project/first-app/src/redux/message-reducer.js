const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
  users: [
    { id: 1, name: "Peli" },
    { id: 2, name: "Fennec" },
    { id: 3, name: "Greef" },
    { id: 4, name: "Boba" },
    { id: 5, name: "Ahsoka" },
    { id: 6, name: "Cara" }
  ],

  messages: [
    { id: 1, message: "Hi!" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "Ok, u?" },
    { id: 4, message: "Too" },
    { id: 5, message: "What about shopping?" },
    { id: 6, message: "Agree, let's go" }
  ],

}

const messageReducer = (state = initialState, action) => {

  switch(action.type) {

    case SEND_MESSAGE: {
      return {...state, messages: [...state.messages, {id: 7, message: action.newMessage}]};
    }

    default:
      return state;
  }

}

export const addMessageActionCreator = (newMessage) => ({ type: SEND_MESSAGE, newMessage });

export default messageReducer;