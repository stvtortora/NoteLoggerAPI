import $ from 'jquery';

export const signup = (user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    url: `https://floating-refuge-85872.herokuapp.com/api/users`,
    data: JSON.stringify(user)
  })
}

export const logIn = (user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    url: `https://floating-refuge-85872.herokuapp.com/api/users/login`,
    data: JSON.stringify(user)
  })
}

export const logOut = (user) => {
  return $.ajax({
    method: 'DELETE',
    contentType: "application/json",
    url: `https://floating-refuge-85872.herokuapp.com/api/users/current/token`,
    headers: {'x-auth': user.token}
  })
}

export const fetchPosts = (user) => {
  return $.ajax({
    method: 'GET',
    contentType: "application/json",
    url: `https://floating-refuge-85872.herokuapp.com/api/subreddits`,
    headers: {'x-auth': user.token}
  })
}

export const addPost = (post, user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    dataType: 'json',
    url: `https://floating-refuge-85872.herokuapp.com/api/subreddits`,
    data: JSON.stringify(post),
    headers: {'X-Auth': user.token}
  })
}

export const updateDocument = (post, user) => {
  return $.ajax({
    method: 'PATCH',
    contentType: "application/json",
    dataType: 'json',
    url: `https://floating-refuge-85872.herokuapp.com/api/subreddits/${post._id}`,
    data: JSON.stringify(post),
    headers: {'X-Auth': user.token}
  })
}

export const removePost = (postId, user) => {
  return $.ajax({
    method: 'DELETE',
    contentType: "application/json",
    url: `https://floating-refuge-85872.herokuapp.com/api/subreddits/${postId}`,
    headers: {'x-auth': user.token}
  })
}

// https://floating-refuge-85872.herokuapp.com/subreddits
