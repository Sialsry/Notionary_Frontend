import { useState, useRef, useEffect } from "react";





const useSelecttitle = () => {
    const [selecttitle, setSelecttitle] = useState('');
    const selectRef = useRef();
    

    useEffect(() => {
        console.log(selecttitle);
    }, [selecttitle])
    console.log(selecttitle, 'ss')
    switch (selecttitle) {
        case (selecttitle === 'header'):
            
            return 
        case (selecttitle === 'bulleted list'):
            
            return 
        case (selecttitle === 'numbered list'):
            
            return 
        case (selecttitle === 'todo list'):
            
            return 
        case (selecttitle === 'toggle list'):
            
            return 
        case (selecttitle === 'image'):
            
            return 
    
        default:
            // return 
    } 
    return {selecttitle, setSelecttitle}

}

export default useSelecttitle 