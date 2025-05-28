import {createStore} from 'redux';
import { reducer } from '../Reducer';
export const store = createStore(reducer);
import { combineReducers } from "redux";
import textreducer from "../Reducer";




// export const store = combineReducers(textreducer)
