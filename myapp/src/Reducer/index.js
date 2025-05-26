import userReducer from './userReducer'
import { combineReducers} from 'redux';
export const reducer = combineReducers({user : userReducer})