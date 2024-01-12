import { useState, useEffect } from 'react';

export default function Tips() {
  const [display, setDisplay] = useState(true);

  const style = {
    fontFamily: "monospace",
    color: "gold",
    fontSize: "18px",
    textAlign: "right",
    position: "fixed",
    top: "3px",
    right: "0px",
    padding: "0px 8px 5px",
  }

  const toolTipStyle = {
    textAlign: "left",
    position: "fixed",
    top: "-200px",
    right: "30px",
  }

  const handleMouseEnter = () => {
    setDisplay(true);
  }

  const handleMouseLeave = () => {
    setDisplay(false);
  }

  // Press ? to toggle tooltip
  useEffect(() => {
    const qMarkDown = (event) => {
      if (event.key === '?') {setDisplay(true);};
    }
    const qMarkUp = (event) => {
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
    const tooltip = document.getElementById('tooltip')
    if (display === false) { tooltip.style.top = "-200px" }
    if (display === true) { tooltip.style.top = "3px" }
  }, [display]);

  // Display tooltip temporarly when page loads
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, []);

  return (
    <>
      <div id="tips" style={style}>
        <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{fontWeight: "bold"}}>?</span>
        <div style={toolTipStyle} id="tooltip">
          ------------------
          <br />
          Keyboard Shortcuts
          <br />
          ------------------
          <br />
          T: Toggle
          <br />
          M: Make new password
          <br />
          C: Copy to clipboard
          <br />
          ?: Show this tooltip
        </div>
      </div>
    </>
  )
}
