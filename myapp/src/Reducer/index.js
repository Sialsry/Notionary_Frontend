import axios from "axios";
import { useParams } from "react-router-dom";


const initState = {
    textData : null
}

const WORKSPACE_URL = 'http://localhost:4000';

const textreducer = async (state = initState,  action) => {

    const {type, payload} = action;
    const{workspacename, folder, filename, data} = payload;
    console.log(workspacename, folder, filename, data)
    switch (key) {
        case 'POST':
            const {data} = await axios.post(`${WORKSPACE_URL}/workspace/selectspace/workspacename/foldername/filename` , {data})
            
            return data
    
        default:
            return
    }

}


export default textreducer