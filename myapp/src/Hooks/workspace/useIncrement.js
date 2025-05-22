import { useState } from "react";


const useIncrement = () => {
    const [autoincrement, setAutoincrement] = useState(1);

    const Increment = () => {
        return setAutoincrement(prev => prev + 1)
    }
}

export {useIncrement}