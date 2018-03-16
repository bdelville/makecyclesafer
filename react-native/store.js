import rootReducer from './app/reducer/reducer'
import { createStore } from 'redux';

// This connects the reducer to the store
export default function configureStore(initialState: Object) {
  let store = createStore(
    rootReducer, initialState
  );

  return store;
}