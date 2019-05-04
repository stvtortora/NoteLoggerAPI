import $ from 'jquery';

export const signup = (user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    url: `api/users`,
    data: JSON.stringify(user)
  })
}

export const logIn = (user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    url: `api/users/login`,
    data: JSON.stringify(user)
  })
}

export const logOut = (user) => {
  return $.ajax({
    method: 'DELETE',
    contentType: "application/json",
    url: `api/users/current/token`,
    headers: {'x-auth': user.token}
  })
}

export const fetchPosts = (user) => {
  return $.ajax({
    method: 'GET',
    contentType: "application/json",
    url: `api/subreddits`,
    headers: {'x-auth': user.token}
  })
}

export const addPost = (post, user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    dataType: 'json',
    url: `api/subreddits`,
    data: JSON.stringify(post),
    headers: {'X-Auth': user.token}
  })
}

export const updateDocument = (post, user) => {
  return $.ajax({
    method: 'PATCH',
    contentType: "application/json",
    dataType: 'json',
    url: `api/subreddits/${post._id}`,
    data: JSON.stringify(post),
    headers: {'X-Auth': user.token}
  })
}

export const removePost = (postId, user) => {
  return $.ajax({
    method: 'DELETE',
    contentType: "application/json",
    url: `api/subreddits/${postId}`,
    headers: {'x-auth': user.token}
  })
}
