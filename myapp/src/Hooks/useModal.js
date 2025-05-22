import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const open = () => {            
    setIsVisible(true);
    setIsOpen(true);
  };

  const close = () => {          
    setIsOpen(false);             
    setTimeout(() => setIsVisible(false), 400); 
  };

  return { isOpen, isVisible, OpenModal: open, ClosedModal: close };
}
