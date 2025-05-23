import { useState, useRef, useEffect } from "react";


const useKeydownTitleHandler = () => {
    const textareaRef = useRef([]);
    const Onkeydowntitle =(e) => {
        const index = parseInt(e.target.dataset.index);
        console.log(index,'index')
        if (e.key === 'Enter'){
            e.preventDefault();
            // setTextareaValue(prev => [...prev.slice(0, index + 1),
            //     '',
            //     ...prev.slice(index + 1)
            // ])
            setTimeout(() => {
                console.log(textareaRef.current, 'asdf')
                textareaRef.current[index + 1]?.focus();
            }, 0);
        
        }
    }
    return {onKeyDown : Onkeydowntitle, textareaRef}
}

export default useKeydownTitleHandler