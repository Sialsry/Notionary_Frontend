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

const getData = async ( ) => {
    try {
        const { data } = await axios.get(`${WORKSPACE_URL}`)
        console.log(data,'axiosget')
        return {state : 200, message : 'success'}
    } catch (error) {
        return {state : 403, message : error}
        
    }
}


export {saveData, getData}
