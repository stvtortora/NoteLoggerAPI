export const loadCachedState = () => {
  const serializedState = localStorage.getItem('state');
  if(serializedState){
    return JSON.parse(serializedState);
  }
  return undefined;
}

export const cacheState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
}
