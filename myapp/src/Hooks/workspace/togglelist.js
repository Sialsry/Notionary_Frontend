import React, { useState } from 'react';

const ToggleList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const items = ['Apple', 'Banana', 'Cherry'];

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Hide List' : 'Show List'}
      </button>

      {isOpen && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToggleList;