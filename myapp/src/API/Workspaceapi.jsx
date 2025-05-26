import axios from "axios";


const WORKSPACE_URL = 'http://localhost:4000';


const saveData = async (api,_data) => {
    console.log('check', _data, api)
    try {
        const { data } = await axios.post(`${WORKSPACE_URL}/${api}`, {data : _data})
        console.log(data,'axios')
        return {state : 200, message : 'success'}
    } catch (error) {
        return {state : 403, message : error}
        
    }
}

const getworkspaceData = async () => {
    try {
        console.log('axiosget')
        const { data } = await axios.get(`${WORKSPACE_URL}/workspace/workspacedata`)
        console.log(data,'axiosget')
        return data
    } catch (error) {
        return {state : 403, message : error}
        
    }
}





export {saveData, getworkspaceData}
