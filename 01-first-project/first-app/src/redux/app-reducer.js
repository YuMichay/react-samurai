import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZED = 'SET-INITIALIZED';

let initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action) => {

  switch(action.type) {

    case SET_INITIALIZED:

      return {
        ...state,
        ...action.initialization,
      }

    default:
      return state;
  }
}

export const setInitializedSuccess = (initialized) => ({ type: SET_INITIALIZED, initialization: { initialized } });
export const initializeApp = () => async(dispatch) => {
  await dispatch(getAuthUserData());
  dispatch(setInitializedSuccess(true));
}

export default appReducer;