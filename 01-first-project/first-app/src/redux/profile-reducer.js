import { userAPI, profileAPI } from '../API/api';

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';
const SAVE_DATA_SUCCESS = 'SAVE-DATA-SUCCESS';

let initialState = {
  posts: [],
  profile: null,
  status: "",
}

const profileReducer = (state = initialState, action) => {

  switch(action.type) {

    case ADD_POST: {
      return {...state, posts: [...state.posts, {id: state.posts.length, message: action.newPost, likes: 0}]};
    }

    case DELETE_POST: {
      return {...state, posts: state.posts.filter((post) => post.id !== action.postId)};
    }

    case SET_USER_PROFILE: {
      return {...state, profile: action.profile};
    }

    case SET_STATUS: {
      return {...state, status: action.status}
    }

    case SAVE_PHOTO_SUCCESS: {
      return {...state, profile: {...state.profile, photos: action.photos}};
    }

    case SAVE_DATA_SUCCESS: {
      return {...state, profile: {...state.profile,
        aboutMe: action.profile.aboutMe || state.profile.aboutMe,
        contacts: action.profile.contacts || state.profile.contacts,
        lookingForAJob: action.profile.lookingForAJob || state.profile.lookingForAJob,
        lookingForAJobDescription: action.profile.lookingForAJobDescription || state.profile.lookingForAJobDescription,
        fullName: action.profile.fullName || state.profile.fullName}}
    }

    default: 
      return state;
  }
  
}

export const addPostActionCreator = (newPost) => ({ type: ADD_POST, newPost });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({ type: SET_STATUS, status});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});
export const saveProfileSuccess = (profile) => ({type: SAVE_DATA_SUCCESS, profile});

export const getUserProfile = (userId) => async (dispatch) => {
  const response = await userAPI.getProfile(userId);
  dispatch(setUserProfile(response));
}

export const getStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setUserStatus(response));
}

export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);
  if(response.data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
}

export const savePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(file);
  if(response.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.photos));
  }
}

export const saveProfile = (profile) => async (dispatch) => {
  const response = await profileAPI.saveProfile(profile);
  if(response.data.resultCode === 0) {
    dispatch(saveProfileSuccess(response.data));
  } 
}

export default profileReducer;