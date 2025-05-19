import { useState, useRef, useEffect } from "react";
import axios from 'axios'

const useProjectinput = () => {
    const [textareavalue, setTextareaValue] = useState(['']);
    const textareaRef = useRef([]);
    const titletextareaRef = useRef([]);
    const [index, setIndex] = useState(0);
    const [titletextareavalue, setTitletextareavalue] = useState(['asdf'])
    const [istitlefocused, setIstitlefocused] = useState(false)



    console.log(textareavalue,textareaRef, 'txtvalue',titletextareavalue, istitlefocused, titletextareavalue,titletextareaRef.current)
    const valueHandler = (e) => {
        const index = e.target.dataset.index
        if(istitlefocused) {
            const newBlock = [...titletextareavalue]
            newBlock[index] = e.target.value;
            return setTitletextareavalue(newBlock)}
        const newBlock = [...textareavalue]
        newBlock[index] = e.target.value;
        setTextareaValue(newBlock)
    }
 
    const resizearea = () => {
        const textarea = textareaRef.current[index];
        if(textarea) {
        textarea.style.height = '29.99px';
        textarea.style.height = `${textarea.scrollHeight}px`
        }
    }
    
    const KeydownHandler = (e) => {
        const index = parseInt(e.target.dataset.index);
        console.log(index,'index')

        
        if (e.key === 'Enter'){
            e.preventDefault();
            if(istitlefocused) {
                textareaRef.current[index]?.focus()
                const newBlock = [...titletextareavalue]
                newBlock[index] = e.target.value;
                return setTitletextareavalue(newBlock)
            }
            setTextareaValue(prev => [...prev.slice(0, index + 1),
                '',
                ...prev.slice(index + 1)
            ])
            setTimeout(() => {
                console.log(textareaRef.current, 'asdf')
                textareaRef.current[index + 1]?.focus();
            }, 0);
            setIndex(index)
        }
        
        if (e.key === 'Backspace' && textareavalue[index] === '' && textareavalue.length > 1) {
            // e.preventDefault();
            const newBlock = [...textareavalue]
            const Refindex = textareaRef.current;
            console.log(Refindex,'sssssss')
            newBlock.splice(index, 1)
            Refindex.splice(index , 1)
            setTextareaValue(newBlock)
            setTimeout(() => {
                textareaRef.current[index - 1]?.focus();
            }, 0);
            setIndex(index)
        }
    }
    useEffect(() => {
        console.log(index ,'dfd',textareaRef)
         
    }, [textareavalue.length])

    useEffect(() => {
        resizearea()
        // if(textareaRef.current[index] > 0) {
            //     const lastTextarea = textareaRef.current[index][textareaRef.current[index].length - 1];
            //     console.log(lastTextarea,'qqqq')
            //     lastTextarea?.focus();
            // }
        }, [textareavalue, textareavalue.length])
    useEffect(() => {
        console.log(index, 'setindex')
        
    }, [index])
        
        
    return {titletextareaRef, titletextareavalue, textareavalue,setIstitlefocused, onChange: valueHandler , textareaRef, onKeyDown : KeydownHandler, onClick : (e) => setIndex(e.target.dataset.index) }
}

export default useProjectinput