import { useState, useEffect } from 'react';

const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;

    const step = (stopTime) => {
      if (!start) start = stopTime;
      const progress = stopTime - start;
      const percentage = Math.min(progress / duration , 1);

      setCount(Math.floor(percentage * end));

      if (percentage < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);

  }, [value]);

  return <span>{count || "--"}</span>;
};

export default Counter;