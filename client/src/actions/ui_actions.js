export const SHOW_FAVORITES = 'SHOW_FAVORITES';
export const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';
export const UPDATE_PAGINATION = 'UPDATE_PAGINATION';
export const RESET_PAGINATION = 'RESET_PAGINATION';

export const showFavorites = () => {
  return {type: SHOW_FAVORITES};
}
export const showSearchResults = () => {
  return {type: SHOW_SEARCH_RESULTS};
}

export const updatePagination = offSet => ({
  type: UPDATE_PAGINATION, offSet
})

export const resetPagination = () => ({
  type: RESET_PAGINATION
})
