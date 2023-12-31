import { authAPI } from '../API/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET-USER-DATA';

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
}

const authReducer = (state = initialState, action) => {

  switch(action.type) {

    case SET_USER_DATA:

      return {
        ...state,
        ...action.payload,
      }

    default:
      return state;
  }
}

export const setAuthUserData = (userId, login, email, isAuth) => ({ type: SET_USER_DATA, payload: { userId, login, email, isAuth } });

export const getAuthUserData = () => async (dispatch) => {
  const response = await authAPI.getAuth();
  if (response.resultCode === 0) {
    let { id, login, email } = response.data;
    dispatch(setAuthUserData(id, login, email, true));
  }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe);
  if (response.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    let message = response.messages.length > 0 ? response.messages[0] : "Something is wrong";
    dispatch(stopSubmit("login", {_error: message}));
  }
}

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}

export default authReducer;