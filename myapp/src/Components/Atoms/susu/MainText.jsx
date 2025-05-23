import React, { useEffect, useState } from 'react';
import '../../../css/Main.css';

const MainText = () => {
  const fullText = "Notionary";
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100); // 타이핑 속도 조절
      return () => clearTimeout(timeout);
    }
  }, [index]);

  useEffect(() => {
    let idx = 0;
    const interval = 1000;
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const animate = (star) => {
      star.style.setProperty('--star-left', `${rand(-10, 100)}%`);
      star.style.setProperty('--star-top', `${rand(-40, 80)}%`);
      star.style.animation = 'none';
      void star.offsetHeight;
      star.style.animation = '';
    };

    const stars = document.getElementsByClassName('magic-star');
    for (const star of stars) {
      setTimeout(() => {
        animate(star);
        setInterval(() => animate(star), 1000);
      }, idx++ * (interval / 3));
    }
  }, []);

  return (
    <div className="main-text-container">
      <h1 className="magic">
        {[...Array(3)].map((_, i) => (
          <span className="magic-star" key={i}>
            <svg viewBox="0 0 512 512">
              <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
            </svg>
          </span>
        ))}
        <span className="magic-text">{displayText}<h2 className="caret">|</h2></span>
      </h1>
    </div>
  );
};

export default MainText;
