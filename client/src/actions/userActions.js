import {GET_USER, UPDATE_USER, GET_USER_TAGS, SAVE_USER_TAG,
    DELETE_USER_TAG, LOGOUT_USER, UPDATE_USER_LOCATION, GET_OTHER_USER,
    CLEAR_TAGS, CLEAR_POSTS} from './types'
import axios from 'axios'
import {getBaseURL} from '../config'

axios.defaults.baseURL = getBaseURL();

export const createUser = (data) => dispatch => {
    return axios.post('api/users/add', data)
};

export const tryLoginUser = (data) => dispatch => {
    return axios.post('api/users/get', data)
};

export const resendActivation = (data) => dispatch => {
    return axios.post('api/users/resend', data)
};

export  const sendLinkPassword = (data) => dispatch => {
    return axios.post('api/users/remind', data);
};

export const tryActivate = (token) => dispatch => {
    return axios.post('api/users/activate', token)
};

export const updatePassword = (password, token) => dispatch => {
    return axios.post('api/users/password', {password, token})
};

export const validatePassword = (password) => dispatch => {
    return axios.post('api/users/password', password)
};

export const updatePasswordFromProfile = (password) => dispatch => {
    return axios.post('api/users/update-password', password)
};

export const saveLocation = (data) => dispatch => {
    axios.post('api/users/update', {data})
    .then(() => dispatch ({
        type: UPDATE_USER_LOCATION,
        payload: data
    }))
};

export const getUser = () => dispatch => {
    axios.post('api/users/get')
        .then(res => res.data)
        .then(user => dispatch({
            type: GET_USER,
            payload: user
        }))
};

export const updateUser = (data) => dispatch => {
    axios.post('api/users/update', {data})
    .then(() => dispatch({
        type: UPDATE_USER,
        payload: data
    }))
};

export const logoutUser = () => dispatch => {
    axios.post('api/users/logout')
        .then(res => res.data)
        .then(user =>
            dispatch({
                type: LOGOUT_USER,
                payload: user
            }),

        )
};

export const getUserTags = () => dispatch => {
    axios.post('api/tags/get-for-user')
        .then(res => res.data)
        .then(userTags => dispatch({
            type: GET_USER_TAGS,
            payload: userTags
        }))
};

export const saveUserTag = (tag) => dispatch => {
    axios.post('api/tags/add-to-user', {name: tag})
        .then(res => dispatch({
            type: SAVE_USER_TAG,
            payload: {tag: tag}
        }))
};

export const deleteUserTag = (tag) => dispatch => {
    axios.post('api/tags/delete-from-user', {name: tag})
        .then(res => dispatch({
            type: DELETE_USER_TAG,
            payload: {tag: tag}
        }))
};

export const getOtherUser = (id) => dispatch => {
  axios.post('api/profile/get', {id: id})
      .then(res => res.data)
      .then((userData) => dispatch({
          type: GET_OTHER_USER,
          payload: userData
      }))
};

export const seeNotify = (id) => dispatch => {
    return axios.post('api/profile/see', {id: id});
};

export const fakeNotification = (id) => dispatch => {
    return axios.post('api/profile/fake', {id: id});
};

export const likeUser = (id) => dispatch => {
    return axios.post('api/profile/like', {id: id})
};

export const unlikeUser = (id) => dispatch => {
    return axios.post('api/profile/unlike', {id: id})
};

export const banUser = (id) => dispatch => {
    return axios.post('api/profile/ban', {id: id})
};
