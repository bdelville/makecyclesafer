import { combineReducers } from 'redux';
import reducer1 from './reducer1';

// Root Reducer
const rootReducer = combineReducers({
  reducer1: reducer1,
});

export default rootReducer;