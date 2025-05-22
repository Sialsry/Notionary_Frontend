import axios from "axios";


const WORKSPACE_URL = 'http://localhost:4000';


    const saveData = async ({data}) => {
        try {
            const { data } = await axios.post(`${WORKSPACE_URL/'saveData'}`, {data})
            return {state : 200, message : 'success'}
        } catch (error) {
            return {state : 403, message : error}
            
        }
    }



export default saveData