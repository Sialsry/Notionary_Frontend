


const initstate = {
    pagestate : false
}


const Pagereducer = (state = initstate, action) => {
    const {type} = action;
    switch(type) {
        case 'True':
            return{ ...state, pagestate : true}
        
        default :
        return {...state, pagestate : false}
    }
}

export default Pagereducer   
 
 
 
 
  
 