import axios from "axios";


const WORKSPACE_URL = 'http://localhost:4000';


    const saveData = async (_data) => {
        console.log('check', typeof (_data))
        try {
            const { data } = await axios.post(`${WORKSPACE_URL}/saveData`, {_data})
            console.log(data,'axios')
            return {state : 200, message : 'success'}
        } catch (error) {
            return {state : 403, message : error}
            
        }
    }



export default saveData
