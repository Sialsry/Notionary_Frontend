import { useState } from 'react'

const useInput = () => {
    const [value, setValue]  = useState("");


    const handlerSetValue = (e) =>{
        setValue(e.target.value) 
    }

    const valueClear = (e) => {
        console.log(e);
    }

    return {value,  onChange : handlerSetValue, onKeydown : valueClear}
}

export default useInput
