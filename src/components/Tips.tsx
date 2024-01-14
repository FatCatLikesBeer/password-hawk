import { useState, useEffect } from 'react';

export default function Tips() {
  const [display, setDisplay] = useState(true);

  const style = {
    fontFamily: "monospace",
    color: "gold",
    fontSize: "18px",
    textAlign: "right",
    position: "absolute",
    top: "6px",
    right: "0px",
    padding: "0px 8px 5px",
  }

  const toolTipStyle = {
    textAlign: "left",
    position: "fixed",
    top: "-210px",
    right: "30px",
    border: "solid 3px grey",
    borderRadius: "10px",
    padding: "8px",
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
      <div id="tips" style={style}>
        <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{fontWeight: "bold"}}>?</span>
        <div style={toolTipStyle} id="tooltip">
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
