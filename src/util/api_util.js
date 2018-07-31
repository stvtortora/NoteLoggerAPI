import $ from 'jquery';

export const signup = (user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    url: `https://obscure-refuge-65051.herokuapp.com/users`,
    data: JSON.stringify(user)
  })
}

export const logIn = (user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    url: `https://obscure-refuge-65051.herokuapp.com/users/login`,
    data: JSON.stringify(user)
  })
}

export const logOut = (user) => {
  return $.ajax({
    method: 'DELETE',
    contentType: "application/json",
    url: `https://obscure-refuge-65051.herokuapp.com/users/current/token`,
    headers: {'x-auth': user.token}
  })
}

export const fetchSubReddits = (user) => {
  return $.ajax({
    method: 'GET',
    contentType: "application/json",
    url: `https://obscure-refuge-65051.herokuapp.com/subreddits`,
    headers: {'x-auth': user.token}
  })
}

export const addSubReddit = (subReddit, user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    dataType: 'json',
    url: `https://obscure-refuge-65051.herokuapp.com/subreddits`,
    data: JSON.stringify(subReddit),
    headers: {'X-Auth': user.token}
  })
}

export const updateDocument = (subreddit, user) => {
  return $.ajax({
    method: 'PATCH',
    contentType: "application/json",
    dataType: 'json',
    url: `https://obscure-refuge-65051.herokuapp.com/subreddits/${subreddit._id}`,
    data: JSON.stringify(subreddit),
    headers: {'X-Auth': user.token}
  })
}

export const removeSubReddit = (postId, user) => {
  return $.ajax({
    method: 'DELETE',
    contentType: "application/json",
    url: `https://obscure-refuge-65051.herokuapp.com/subreddits/${postId}`,
    headers: {'x-auth': user.token}
  })
}

// https://obscure-refuge-65051.herokuapp.com/subreddits
