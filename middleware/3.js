/*
 * @LastEditTime: 2020-10-16 20:02:06
 * @LastEditors: jinxiaojian
 */
import { createStore } from '../createStore.js'
import { combineReducers } from '../combineReducers.js'
import { middlewareEx } from './ex.js'
import { middlewareIn } from './in.js'
import { middlewareTime } from './time.js'
import {applyMiddleware} from '../applyMiddleware.js'

function counterReducer (state = {
  count: 0
}, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}
function InfoReducer (state = {
  name: '',
  description: ''
}, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    default:
      return state;
  }
}


const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
});







// const middlewareAdd = applyMiddleware(middlewareEx,middlewareIn,middlewareTime)
// const newCreateStore=middlewareAdd(createStore)
// let store = newCreateStore(reducer);

const rewriteCreateStoreFunc = applyMiddleware(middlewareEx, middlewareIn, middlewareTime);
const store = createStore(reducer, rewriteCreateStoreFunc);
const unsubscribe = store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count);
});
/*退订*/
unsubscribe();

store.dispatch({
  type: 'INCREMENT'
});

