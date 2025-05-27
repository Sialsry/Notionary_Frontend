import { combineReducers, createStore } from "redux";
import textreducer from "../Reducer";




export const store = createStore(textreducer)