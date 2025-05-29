import { useState, useRef, useEffect } from "react";
import axios from 'axios'


const useProjectinput = () => {
    const [contentvalue, setContentValue] = useState([
        {fontsize : '24px', content : '', fontweight : '600', type : 'header1' , height : '29px'}
    ]);
    const [titlevalue, settitleValue] = useState([{content : '', focus : false}]);
    const contentRef = useRef([]);
    const titleRef = useRef([]);
    
    const valueHandler = (e) => {
        if(titlevalue.focus) {
            const Block = [...titlevalue]
            Block.content = e.target.value
            return settitleValue(Block)
        }
        else {
            const index = e.target.dataset.index;
            const Block = [...contentvalue]
            Block[index].content = e.target.value;
            return setContentValue(Block);
        }
    }



    return {contentvalue, 
        setContentValue, 
        contentRef,
        titleRef,
        titlevalue,
        settitleValue
     }
}

export default useProjectinput