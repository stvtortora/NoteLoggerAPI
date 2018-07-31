import $ from 'jquery';

export const signup = (user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    url: `/api/users`,
    data: JSON.stringify(user)
  })
}

export const logIn = (user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    url: `/api/users/login`,
    data: JSON.stringify(user)
  })
}

export const logOut = (user) => {
  return $.ajax({
    method: 'DELETE',
    contentType: "application/json",
    url: `/api/users/current/token`,
    headers: {'x-auth': user.token}
  })
}

export const fetchSubReddits = (user) => {
  return $.ajax({
    method: 'GET',
    contentType: "application/json",
    url: `/api/subreddits`,
    headers: {'x-auth': user.token}
  })
}

export const addSubReddit = (subReddit, user) => {
  return $.ajax({
    method: 'POST',
    contentType: "application/json",
    dataType: 'json',
    url: `/api/subreddits`,
    data: JSON.stringify(subReddit),
    headers: {'X-Auth': user.token}
  })
}

export const updateDocument = (subreddit, user) => {
  return $.ajax({
    method: 'PATCH',
    contentType: "application/json",
    dataType: 'json',
    url: `/api/subreddits/${subreddit._id}`,
    data: JSON.stringify(subreddit),
    headers: {'X-Auth': user.token}
  })
}

export const removeSubReddit = (postId, user) => {
  return $.ajax({
    method: 'DELETE',
    contentType: "application/json",
    url: `/api/subreddits/${postId}`,
    headers: {'x-auth': user.token}
  })
}

// https://floating-refuge-85872.herokuapp.com/subreddits
