import {createStore, applyMiddleware} from 'redux';
import Reducers from './reducers';
import thunk from 'redux-thunk';

export const configureStore = () => {
  return createStore(Reducers, applyMiddleware(thunk));
};
