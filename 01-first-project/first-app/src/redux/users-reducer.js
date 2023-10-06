import { userAPI } from '../API/api';
import { updateObjectInArray } from '../utils/object-helper'

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USER';
const SET_PAGES = 'SET_PAGE';
const SET_TOTAL = 'SET_TOTAL';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';

let initialState = {
  users: [],
  pageSize: 6,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  isFollowing: [],
}

const usersReducer = (state = initialState, action) => {
  
  switch(action.type) {

    case FOLLOW:

      return {...state, users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
        /* state.users.map((user) => {
        if (user.id === action.userId) {
          return {...user, followed: true};
        }
        return user;
        })
        */
      };

    case UNFOLLOW:

      return {...state, users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
      /*  state.users.map((user) => {
        if (user.id === action.userId) {
          return {...user, followed: false};
        }
        return user;
      })
      */
    };

    case SET_USERS:

    return {...state, users: action.users}

    case SET_PAGES:

    return {...state, currentPage: action.currentPage}

    case SET_TOTAL:

      return {...state, totalUsersCount: action.count}

    case TOGGLE_IS_FETCHING:
      
      return {...state, isFetching: action.fetching}

    case TOGGLE_IS_FOLLOWING:
    
      return {...state, isFollowing: action.isFetching ? [...state.isFollowing, action.userId] : [...state.isFollowing.filter(id => id !== action.userId)]}

    default:
      return state;
  }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setPages = (currentPage) => ({ type: SET_PAGES, currentPage });
export const setTotalUsers = (totalCount) => ({ type: SET_TOTAL, count: totalCount});
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, fetching: isFetching});
export const toggleIsFollowing = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING, isFetching, userId});

export const requestUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setPages(currentPage));
    const data = await userAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));    
    dispatch(setUsers(data.items));
    dispatch(setTotalUsers(data.totalCount));
  }
}

export const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleIsFollowing(true, userId));
    const response = await apiMethod(userId);
    if (response.resultCode === 0) {
      dispatch(actionCreator(userId));
      dispatch(toggleIsFollowing(false, userId));
    } 
}

export const follow = (user) => {
  return async (dispatch) => {
    const apiMethod = userAPI.follow.bind(userAPI);
    followUnfollowFlow(dispatch, user.id, apiMethod, followSuccess);
  }
}

export const unfollow = (user) => {
  return async (dispatch) => {
    const apiMethod = userAPI.unfollow.bind(userAPI);
    followUnfollowFlow(dispatch, user.id, apiMethod, unfollowSuccess);
  }
}

export default usersReducer;