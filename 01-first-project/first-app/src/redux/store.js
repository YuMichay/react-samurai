import profileReducer from './profile-reducer';
import messageReducer from './message-reducer';
import sidebarReducer from './sidebar-reducer';

let store = {
  
  _state: {
  
    profilePage: {

      posts: [
        { id: 1, message: "I miss you, Mandalorian", likes: 4 },
        { id: 2, message: "...Ughhhh...", likes: 2 },
      ],
      newPost: 'New Post',

    },

    messagePage: {

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

      newMessage: 'New Message',

    },

    sideBarPage: {

      friends: [
        { id: 1, name: "Peli" },
        { id: 2, name: "Fennec" },
        { id: 3, name: "Greef" },
      ],
      
    },

  },

  getState() {
    return this._state;
  },

  _callSubscriber() {
    console.log('State was changed');
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagePage = messageReducer(this._state.messagePage, action);
    this._state.sideBarPage = sidebarReducer(this._state.sideBarPage, action);

    this._callSubscriber(this._state);
  },

}

export default store;

window.store = store;