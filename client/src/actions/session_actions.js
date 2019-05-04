import { signup, logIn, logOut } from '../util/api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS"
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS"
export const LOGOUT_USER = "LOGOUT_USER";

export const signUp = (user) => {
  return dispatch => {
    return signup(user).then((user, textStatus, jqXHR) => {
      user.token = jqXHR.getResponseHeader('x-auth');
      return dispatch({type: RECEIVE_USER, user})
    },
    err => {
      return dispatch({type: RECEIVE_SESSION_ERRORS, errors: err.responseJSON})
    }
  )};
};

export const login = (user) => {
  return dispatch => {
    return logIn(user).then((user, textStatus, jqXHR) => {
      user.token = jqXHR.getResponseHeader('x-auth');
      return dispatch({type: RECEIVE_USER, user})
    },
    err => {
      return dispatch({type: RECEIVE_SESSION_ERRORS, errors: err.responseJSON})
    }
  )};
};

export const logout = (user) => dispatch => (
  logOut(user).then(() => dispatch({type: LOGOUT_USER}))
)

export const clearSessionErrors = () => ({ type: CLEAR_SESSION_ERRORS })
