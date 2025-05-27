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

const getworkspaceDataOne = async () => {
    try {
        console.log('axiosget')
        const  {data}  = await axios.get(`${WORKSPACE_URL}/workspace/workspacedataOne`)
        console.log(data,'axiosget')
        return data
    } catch (error) {
        return {state : 403, message : error}
        
    }
}
const getworkspaceDataTwo = async () => {
    try {
        console.log('axiosget')
        const { data } = await axios.get(`${WORKSPACE_URL}/workspace/workspacedataTwo`)
        console.log(data,'axiosget2')
        return data
    } catch (error) {
        return {state : 403, message : error}
        
    }
}


const getTextdata = async () => {
    try {
        const {data} =  await axios.get(`${WORKSPACE_URL}/workspace/getPage`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

const getWspacecontent = async (wname) => {
    try {
        const {data} = await axios.get(`${WORKSPACE_URL}/workspaceContent`, {wname})
        console.log(data, 'getwspaceconte')
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}



export {saveData, getworkspaceDataOne, getworkspaceDataTwo, getTextdata, getWspacecontent}
