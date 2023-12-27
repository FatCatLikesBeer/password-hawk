import { useState } from 'react';

export default function Buttons() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button className="counter" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <button className="counter" onClick={() => setCount(0)}>
        count to 0
      </button>
    </>
  );
}
