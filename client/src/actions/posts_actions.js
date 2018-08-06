import * as APIUtil from './../util/api_util';
import {closeModal} from './modal_actions';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const UPDATE_CURRENT_POST = 'UPDATE_CURRENT_POST';
export const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';

export const fetchPosts = (user) => dispatch => (
  APIUtil.fetchPosts(user).then((favorites) => dispatch({type: RECEIVE_POSTS, favorites}))
)

export const addFavorite = (post, user) => dispatch => (
  APIUtil.addPost(post, user).then((post) => dispatch({type: ADD_POST, post})).then(() => dispatch(closeModal()))
)

export const removeFavorite = (postId, user) => dispatch => (
  APIUtil.removePost(postId, user).then(() => dispatch({type: REMOVE_POST, postId})).then(() => dispatch(closeModal()))
)

export const updateDocument = (post, user) => dispatch => (
  APIUtil.updateDocument(post, user).then((doc) => dispatch({type: UPDATE_DOCUMENT, doc})).then(() => dispatch(closeModal()))
)

export const updateCurrentPost = data => ({
  type: UPDATE_CURRENT_POST, data
})

export const receiveSearchResults = results => ({
  type: RECEIVE_SEARCH_RESULTS, results
})
