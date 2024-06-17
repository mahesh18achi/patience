import { createStore, combineReducers } from 'redux';
import { cartReducer } from './reducer';  // Adjust the import path as needed

const rootReducer = combineReducers({
  cart: cartReducer,
 
});

const store = createStore(rootReducer);

export default store;