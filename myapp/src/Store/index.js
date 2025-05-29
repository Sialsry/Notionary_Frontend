import { applyMiddleware, combineReducers, createStore } from "redux";
import textreducer from "../Reducer";
import {thunk} from 'redux-thunk'
import Pagereducer from "../Reducer/Pagestate.reducer";



export const store = createStore(Pagereducer)
