import { configureStore } from "@reduxjs/toolkit";
import fieldsReducer from "./slices/fieldSlice";


const loadState = () => {
  try{
    const state = localStorage.getItem('reduxState');
    if(state === null) return undefined;
    return JSON.parse(state);
  }catch(error){
    console.log(error);
    return undefined;
  }
}

const saveState = (state) => {
  try{
    const JSONState = JSON.stringify(state)
    localStorage.setItem('reduxState', JSONState);
  }catch(error){
    console.log(error);
  }
}

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    fields: fieldsReducer,
  },
  preloadedState,
  devTools: true,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;