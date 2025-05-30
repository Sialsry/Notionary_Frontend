import { useEffect } from 'react';

const useAutoScroll = (ref, commentDeps) =>  {
  useEffect(() => {
    if (ref.current) { 
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, commentDeps);
}

export default useAutoScroll;
