import { useState } from 'react';

export default function Tips() {
  const [display, setDisplay] = useState(false);

  const ToggleSwitch = () => {
    const style = {
      padding: "5px",
    }

    return (
      <span style={style}>
        X
      </span>
    )
  }

  const style = {
    backgroundColor: "#242424",
    color: "grey",
    fontSize: "15px",
    alignText: "center",
    position: "fixed",
    top: "0px",
    right: "0px",
    transition: "top 0.25s",
    borderStyle: "none solid solid solid",
    borderColor: "grey",
    borderWidth: "3px",
    padding: "0px 8px 5px",
    borderRadius: "0px 0px 8px 8px",
  }

  return (
    <div id="tips" style={style}>
      "T" toggle | "M" make new password | "C" copy to clipboard
      <ToggleSwitch />
    </div>
  )
}
