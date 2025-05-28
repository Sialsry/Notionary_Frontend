import { applyMiddleware, combineReducers, createStore } from "redux";
import textreducer from "../Reducer";
import {thunk} from 'redux-thunk'



export const store = createStore(textreducer, applyMiddleware(thunk))