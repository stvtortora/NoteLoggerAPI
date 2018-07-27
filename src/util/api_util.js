import $ from 'jquery';

export const signup = (user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    url: `http://localhost:3000/users`,
    data: JSON.stringify(user)
  })
}

export const logIn = (user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    url: `http://localhost:3000/users/login`,
    data: JSON.stringify(user)
  })
}

export const logOut = (user) => {
  return $.ajax({
    method: 'DELETE',
    contentType: "application/json",
    url: `http://localhost:3000/users/current/token`,
    headers: {'x-auth': user.token}
  })
}

export const fetchSubReddits = (user) => {
  return $.ajax({
    method: 'GET',
    contentType: "application/json",
    url: `http://localhost:3000/users/users/subreddits`,
    headers: {'x-auth': user.token}
  })
}

export const addSubReddit = (subReddit, user) => {
  console.log(subReddit)
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    dataType: 'json',
    url: `http://localhost:3000/subreddits`,
    data: JSON.stringify(subReddit),
    headers: {'X-Auth': user.token}
  })
}

export const removeSubReddit = (postId, user) => {
  return $.ajax({
    method: 'DELETE',
    contentType: "application/json",
    url: `http://localhost:3000/subreddits/${postId}`,
    headers: {'x-auth': user.token}
  })
}

// https://obscure-refuge-65051.herokuapp.com/subreddits
