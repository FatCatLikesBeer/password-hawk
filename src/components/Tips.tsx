import { useState, useEffect } from 'react';

export default function Tips() {
  const [display, setDisplay] = useState(true);

  const handleMouseEnter = () => {
    setDisplay(true);
  }

  const handleMouseLeave = () => {
    setDisplay(false);
  }

  // Press ? to toggle tooltip
  useEffect(() => {
    const qMarkDown = (event: any) => {
      if (event.key === '?') {setDisplay(true);};
    }
    const qMarkUp = (event: any) => {
      if (event.key === '?') {setDisplay(false);};
      if (event.key === '/') {setDisplay(false);};
    }
    document.addEventListener('keydown', qMarkDown);
    document.addEventListener('keyup', qMarkUp);

    return () => {
      document.removeEventListener('keydown', qMarkDown);
      document.removeEventListener('keyup', qMarkUp);
    }
  });

  // Thing that controls the visibility
  useEffect(() => {
    // The '!' at the end of the following line is to let TS know that this element will never be null
    const tooltip: HTMLElement = document.getElementById('tooltip')!;
    if (display === false) { tooltip.style.top = "-210px" }
    if (display === true) { tooltip.style.top = "12px" }
  }, [display]);

  // Display tooltip temporarly when page loads
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, []);

  return (
    <>
      <div id="tips">
        <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{fontWeight: "bold"}}>?</span>
        <div id="tooltip">
          <span style={{fontWeight: "bold"}}>KEYBOARD SHORTCUTS</span>
          <br />
          T: Toggle style
          <br />
          M: Make new password
          <br />
          C: Copy to clipboard
          <br />
          Y: Make new & copy
          <br />
          ?: Show this tooltip
        </div>
      </div>
    </>
  )
}
