import axios from "axios";


const WORKSPACE_URL = 'http://localhost:4000';


const saveData = async (api, _data) => {
    console.log('check', _data, api)
    try {
        const { data } = await axios.post(`${WORKSPACE_URL}/${api}`, { data: _data })
        console.log(data, 'axios')
        return { state: 200, message: 'success' }
    } catch (error) {
        return { state: 403, message: error }

    }
}

const getworkspaceDataOne = async (userInfo) => {
    try {
        console.log('axiosget')
        const { data } = await axios.get(`${WORKSPACE_URL}/workspace/workspacedataOne`, { userInfo })
        console.log(data, 'axiosget')
        return data
    } catch (error) {
        return { state: 403, message: error }

    }
}
const getworkspaceDataTwo = async (userInfo) => {
    try {
        console.log('axiosget')
        const { data } = await axios.get(`${WORKSPACE_URL}/workspace/workspacedataTwo`, { userInfo })
        console.log(data, 'axiosget2')
        return data
    } catch (error) {
        return { state: 403, message: error }

    }
}


const getTextdata = async () => {
    try {
        const { data } = await axios.get(`${WORKSPACE_URL}/workspace/getPage`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

const getWspacecontent = async (wname) => {
    try {
        const { data } = await axios.get(`${WORKSPACE_URL}/workspaceContent`, { wname })
        console.log(data, 'getwspaceconte')
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}
const getBlock = async (workspacename, foldername, filename, {data}, imgpath, blockId) => {
    if (imgpath) {
        console.log(data, 'axiosdata')
        const form = new FormData();
        const dataJson = JSON.stringify(data);
        form.append("data", dataJson)
        form.append("imgpath", imgpath)
        const { data: workspaceData } = await
            axios.post(`${WORKSPACE_URL}/workspace/selectspace/${workspacename}/${foldername}/${filename}/image/${blockId}`,
                form,
                {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
    }
    else {
        // const form = new FormData();
        // form.append("workspacename", workspacename)
        // form.append("foldername", foldername)
        // form.append("filename", filename)
        // form.append("data", data)

        // const { data: workspaceData } = await
        //     axios.post(`${WORKSPACE_URL}/workspace/selectspace/${workspacename}/${foldername}/${filename}`,
        //         form,
        //         {
        //             header: {
        //                 'Content-Type': 'multipart/form-data'
        //             }
        //         }
        //     )
        const { data: workspaceData } = await axios.post(`${WORKSPACE_URL}/workspace/selectspace/${workspacename}/${foldername}/${filename}`, { data })
    }
    // const newData = JSON.parse(workspaceData.data.PageData.page_content)
    return { state: 200, message: 'nice' }
}

const getBlock2 = async (workspacename, foldername, filename) => {
    const { data: workspaceData } = await axios.get(`${WORKSPACE_URL}/workspace/selectspace/${workspacename}/${foldername}/${filename}`)
    console.log(workspaceData, 'workspacedata')
    if (workspaceData.data.PageData) {
        const newData = JSON.parse(workspaceData.data.PageData.page_content)
        console.log(newData)
        return newData
    }
    else {
        return null
    }
}


export { getBlock, saveData, getworkspaceDataOne, getworkspaceDataTwo, getTextdata, getWspacecontent, getBlock2 }
