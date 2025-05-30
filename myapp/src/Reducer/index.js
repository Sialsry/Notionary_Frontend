import userReducer from './userReducer'
import { combineReducers} from 'redux';
import { useParams } from "react-router-dom";
import { getBlock } from "../API/Workspaceapi";
import axios from "axios";
export const reducer = combineReducers({user : userReducer})


const initState = {
    textData : null
}

const WORKSPACE_URL = 'http://localhost:4000';

const textreducer = (state = initState,  action) => {

    const {type, payload} = action;
    console.log(type, payload, 'payload')
    switch (type) {
        case 'POST':
            console.log(state, '123123')
            const{workspacename, foldername, filename, data} = payload;
            console.log(workspacename, foldername, filename, data,'kdfdkf')
            const newData = getBlock(workspacename, foldername, filename, data)
            // const {data : workspaceData} = axios.post(`${WORKSPACE_URL}/workspace/selectspace/${workspacename}/${foldername}/${filename}` , {data})
            // console.log(workspaceData.data, 'workspacedata')
            // console.log({...state, textData : workspaceData.data.PageData})
            // const newData = JSON.parse(workspaceData.data.PageData.page_content)
            console.log(state, newData, 'reducer')
            return {...state, textData : newData}
    
        default:
            return state
    }
}


export default textreducer
