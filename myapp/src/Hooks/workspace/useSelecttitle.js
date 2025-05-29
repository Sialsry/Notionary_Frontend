import { useState, useRef, useEffect } from "react";





const useSelecttitle = () => {
    const [selecttitle, setSelecttitle] = useState('');
    const selectRef = useRef();
    
    useEffect(() => {
        console.log(selecttitle);
    }, [selecttitle])

    return {selecttitle, setSelecttitle}

}

export default useSelecttitle 