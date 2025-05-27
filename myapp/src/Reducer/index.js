import axios from "axios";
import { useParams } from "react-router-dom";


const initState = {
    textData : null
}

const WORKSPACE_URL = 'http://localhost:4000';

const textreducer = async (state = initState,  action) => {

    const {type, payload} = action;
    switch (type) {
        case 'POST':
            const{workspacename, foldername, filename, data} = payload;
            console.log(workspacename, foldername, filename, data,'kdfdkf')
            const {data : workspaceData} = await axios.post(`${WORKSPACE_URL}/workspace/selectspace/${workspacename}/${foldername}/${filename}` , {data})
            console.log(workspaceData, 'workspacedata')
            return {...state, textData : workspaceData}
    
        default:
            return state
    }

}


export default textreducer