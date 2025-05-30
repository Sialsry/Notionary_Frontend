import {createStore} from 'redux';
import { reducer } from '../Reducer';
import { combineReducers } from "redux";
import textreducer from "../Reducer";
import Pagereducer from '../Reducer/Pagestate.reducer';




const combinedreducer = combineReducers({reducer, Pagereducer})
export const store = createStore(combinedreducer);
// console.log(combinedreducer, 'combinedreducer')
