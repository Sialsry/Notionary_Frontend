import { useState, useRef, useEffect } from "react";
import axios from 'axios'

const useProjectinput = () => {
    const [textareavalue, setTextareaValue] = useState(['']);
    const textareaRef = useRef([]);
    const titleRef = useRef([]);
    const [index, setIndex] = useState(0);
    const [istitleFocused, setistitleFocused] = useState(false)
    const [titlevalue, settitleValue] = useState([''])
    const [clickHandler, setClickHandler] = useState()
    
    
    console.log(istitleFocused,titlevalue,'istitleFocused', textareavalue,'dkkkf')
    const valueHandler = (e) => {
        console.log("eeeeeeeeeeeee")
        if(istitleFocused) {
            const newBlock = [...titlevalue]
            newBlock[index] = e.target.value;
            return settitleValue(newBlock)
        }
        else {
            const index = e.target.dataset.index
            const newBlock = [...textareavalue]
            newBlock[index] = e.target.value;
            setTextareaValue(newBlock)
        }
    // const titletextareaRef = useRef([]);
    // const [index, setIndex] = useState(0);
    // const [titletextareavalue, setTitletextareavalue] = useState(['asdf'])
    // const [istitlefocused, setIstitlefocused] = useState(false)
        


    // console.log(textareavalue,textareaRef, 'txtvalue',titletextareavalue, istitlefocused, titletextareavalue,titletextareaRef.current)
    // const valueHandler = (e) => {
    //     const index = e.target.dataset.index
    //     if(istitlefocused) {
    //         const newBlock = [...titletextareavalue]
    //         newBlock[index] = e.target.value;
    //         return setTitletextareavalue(newBlock)}
    //     const newBlock = [...textareavalue]
    //     newBlock[index] = e.target.value;
    //     setTextareaValue(newBlock)
    }
 
    const resizeAreaAll = () => {
        for (let index = 0; index < textareaRef.current.length; index++) {            
            const textarea = textareaRef.current[index];
            if(textarea) {
                textarea.style.height = '29.99px';
                textarea.style.height = `${textarea.scrollHeight}px`
            }
        }
    }

    const resizeArea = () => {
        console.log(index,'re')
        const textarea = textareaRef.current[index];
        if(textarea) {
        textarea.style.height = '29.99px';
        textarea.style.height = `${textarea.scrollHeight}px`
        }
    }
    const resizeTitle = () => {
        const textarea = titleRef.current[index];
        if(textarea) {
        textarea.style.height = '50.99px';
        textarea.style.height = `${textarea.scrollHeight}px`
        }
    }
    
    const KeydownHandler = (e) => {
        const index = parseInt(e.target.dataset.index);
        console.log(index,'index1')

        
        if (e.key === 'Enter'){
            e.preventDefault();
            if(istitleFocused) { textareaRef.current[index]?.focus()
                const newBlock = [...titlevalue]
                newBlock[index] = e.target.value;
                return setTimeout(() => {     
                    console.log(textareaRef.current,titleRef.current, 'asdf11')
                    textareaRef.current[index]?.focus();
                    setistitleFocused(false)
                    settitleValue(newBlock)
                }, 0);
            // if(istitlefocused) {
            //     textareaRef.current[index]?.focus()
            //     const newBlock = [...titletextareavalue]
            //     newBlock[index] = e.target.value;
            //     setTitletextareavalue(newBlock)
            }
            
            setTextareaValue(prev => [...prev.slice(0, index + 1),
                '',
                ...prev.slice(index + 1)
            ])
            setTimeout(() => {
                textareaRef.current[index + 1]?.focus();
            }, 0);
        }
        else if (e.key === 'ArrowUp'){
            if(index > 0){
                setTimeout(() => {
                    textareaRef.current[index - 1]?.focus();
                }, 0);
            } 
            else {
                setTimeout(() => {
                    titleRef.current[index]?.focus();
                },0)
            }
        }
        else if (e.key === 'ArrowDown'){
            if(istitleFocused){  
                setTimeout(() => {
                    textareaRef.current[index]?.focus();
                }, 0);
            } else {
                setTimeout(() => {
                    textareaRef.current[index + 1]?.focus();
                }, 0);
                
            }
        }
        else if (e.key === 'Backspace' && textareavalue[index] === '' && index === 0) {
            setTimeout(() => {
                titleRef.current[index]?.focus();
            },0)}

        else if (e.key === 'Backspace' && textareavalue[index] === '' && textareavalue.length > 1) {
            e.preventDefault();
            // console.log(Refindex,'refindex`')
            const newBlock = [...textareavalue]
            const Refindex = textareaRef.current;
            console.log(Refindex,'sssssss')
            newBlock.splice(index, 1)
            Refindex.splice(index , 1)
            setTextareaValue(newBlock)
            setTimeout(() => {
                textareaRef.current[index - 1]?.focus();
            }, 0);
            
        }
        else if (!istitleFocused){
            const newBlock = [...textareavalue]
            newBlock[index] = e.target.value;
            setTextareaValue(newBlock)
            console.log('else`',newBlock[index],'ss')
        }
        setIndex(index)
    }
  

    useEffect(() => {
        console.log('textareavalue')
        resizeArea()
        resizeAreaAll ()
    }, [textareavalue])

    useEffect(() => {
        // console.log('titlevalue')
        resizeTitle()
    }, [ titlevalue])

    useEffect(() => {
        console.log(index, 'setindex')
    }, [index])
        
        
    return { textareavalue, 
        titlevalue,
        onChange: valueHandler, 
        textareaRef,titleRef, 
        setistitleFocused, 
        onKeyDown : KeydownHandler, 
        onClick : (e) => setIndex(e.target.dataset.index) }
    // return {titletextareaRef, titletextareavalue, textareavalue,setIstitlefocused, onChange: valueHandler , textareaRef, onKeyDown : KeydownHandler, onClick : (e) => setIndex(e.target.dataset.index) }
}

export default useProjectinput