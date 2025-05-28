import {createStore} from 'redux';
import { reducer } from '../Reducer';
import { combineReducers } from "redux";
import textreducer from "../Reducer";




export const store = createStore(reducer);
// export const store = combineReducers(textreducer)
