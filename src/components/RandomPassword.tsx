import { useState, useEffect } from 'react'
import { unstructuredParser } from '../assets/passwordParser.tsx'
import Slider from '@mui/material/Slider'
import ModificationSwitch from './ModificationSwitch.tsx'
import Clipboard from 'react-clipboard.js'
import copyToClipboard from '../assets/keydownToClipboard.tsx'
import keyDownFeedback from '../assets/keyDownFeedback.tsx'

export default function RandomPassword(props) {
  const [minLength, maxLength] = [15, 55];
  const [password, setPassword] = useState([]);
  const [passwordLength, setPasswordLength] = useState(20)
  const [useColor, setUseColor] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useMixedCase, setUseMixedCase] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isDropdownNeeded = props.isDropdownNeeded;

  // Arrays filled with potentially available characters
  const characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const symbols = ["+", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "?"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  // Title Component
  const Title = () => {
    return <h2>Random Password</h2>
  }

  // Picks a list of Characters to use based on the state of useNumbers and useSymbols
  const listMaker = () => {
    let result = characters;
    if (useSymbols === true) { result.push(...symbols) };
    if (useNumbers === true) { result.push(...numbers) };
    return result;
  }
  const theList = listMaker();

  // Random Character Generator, randomly return upper or lower case version character
  const randomLetterGenerator = (source) => {
    let result;

    // Picks a character, any character.
    const resultUncased = () => {
      const selector = Math.floor(Math.random() * source.length);
      return source[selector];
    }

    // Use mixed case or only lowercase
    if (useMixedCase === true) {
      if (Math.random() > .5) {
        result = resultUncased().toUpperCase()
      } else {
        result = resultUncased()
      }
    } else {
      result = resultUncased().toLowerCase()
    }
    return result;
  }

  // Generates the password (stores a list of random characters to the setPassword hook)
  function passwordGenerator(flag) {
    let result = [];
    for (let i = 0; i < passwordLength; i++) {
      result.push(randomLetterGenerator(theList))
    }
    setPassword(result);
    if (flag) { return result.join("") }
  }

  // Parses the password state variable into a 
  // a list of decorated HTML elements.
  const passwordList = unstructuredParser(password, useColor);

  // Turns the password useState object (which exists as a list) into a string
  const passwordAsString = password.join("")

  // Component: Displays the parsed password
  const PasswordDisplay = () => {
    return <span className="passwords">{passwordList}</span>
  }

  // Takes the value of the slider and modifies the passwordLength value
  const handleSliderChange = (event, newValue) => {
    setPasswordLength(newValue);
  };

  // Component: Button that runs the password generator
  const Button = () => {
    return <button onClick={passwordGenerator}>Make Passcode</button>
  }

  // Toggle Dropdown function
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  //
  // Set's the dropdown state value to false
  const dropdownFalse = () => {
    setIsDropdownOpen(false);
  }

  // Generates a password on page load and when options change
  useEffect(() => {
    passwordGenerator();
  }, [useSymbols, useNumbers, useMixedCase, passwordLength]);

  // Keyboard Shortcuts
  const Shortcuts = () => {
    useEffect(() => {
      const handleKeyPress = (event) => {
        const clipButton = document.getElementById('clipboard').firstChild;
        const makeButton = document.getElementById('generator').firstChild;
        if (event.key === 'm') { passwordGenerator(); keyDownFeedback(makeButton, "gold") };
        if (event.key === 'c') { copyToClipboard(passwordAsString); keyDownFeedback(clipButton, "gold") };
        if (event.key === "y") {
          keyDownFeedback(clipButton, 'gold');
          keyDownFeedback(makeButton, 'gold');
          copyToClipboard(passwordGenerator(true));
        };
      }
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress)
      }
    }, [passwordAsString]);
  }

  return (
    <div className="mainContainer">
      <div className="options">
        <div className="containerTitle">Options</div>
        <div className="optionsControls">
          <div id="generator" onClick={dropdownFalse}><button onClick={passwordGenerator}>Make Passcode</button></div>
          <div id="clipboard"><Clipboard data-clipboard-text={passwordAsString} onClick={dropdownFalse}>{!isDropdownNeeded ? "Copy to Clipboard" : "Clipboard Copy"}</Clipboard></div>
          {/* The reason for this atrocious ternary is because of MaterialUI */}
          {/* The MUI Slider Component breaks if I put it in its own component. */}
          {!isDropdownNeeded ?
            <div id="dropdown">
            <Shortcuts />
              <div className="slider">
                Character Count ↓
                <Slider
                  track={false}
                  value={passwordLength}
                  onChange={handleSliderChange}
                  aria-label="Number Of Words"
                  defaultValue={passwordLength}
                  valueLabelDisplay="auto"
                  style={{ width: 180 }}
                  step={1}
                  min={minLength}
                  max={maxLength}
                />
              </div>
              <div id="modSwitchContainer">
                <ModificationSwitch name="toggle_number" title={"Use Numbers"} setState={setUseNumbers} state={useNumbers} />
                <ModificationSwitch name="toggle_symbol" title={"Use Symbols"} setState={setUseSymbols} state={useSymbols} />
                <ModificationSwitch name="toggle_case" title={"Use Mixed Case"} setState={setUseMixedCase} state={useMixedCase} />
                <ModificationSwitch name="toggle_color" title={"Colorize Result"} setState={setUseColor} state={useColor} />
              </div>
            </div>
            : isDropdownOpen ?
              <div id="dropdown">
                <div className="slider">
                  Character Count ↓
                  <Slider
                    track={false}
                    value={passwordLength}
                    onChange={handleSliderChange}
                    aria-label="Number Of Words"
                    defaultValue={passwordLength}
                    valueLabelDisplay="auto"
                    style={{ width: 280 }}
                    step={1}
                    min={minLength}
                    max={maxLength}
                  />
                </div>
                <div id="modSwitchContainer">
                <ModificationSwitch name="toggle_number" title={"Use Numbers"} setState={setUseNumbers} state={useNumbers} />
                <ModificationSwitch name="toggle_symbol" title={"Use Symbols"} setState={setUseSymbols} state={useSymbols} />
                <ModificationSwitch name="toggle_case" title={"Use Mixed Case"} setState={setUseMixedCase} state={useMixedCase} />
                <ModificationSwitch name="toggle_color" title={"Colorize Result"} setState={setUseColor} state={useColor} />
                </div>
              </div> : ""}
          {/* Glorious End of atrocious ternary */}
          {isDropdownNeeded ?
            isDropdownOpen ?
              <span style={{ width: 200, color: "dodgerblue" }} onClick={toggleDropdown}>hide modifiers</span> :
              <span style={{ width: 200, color: "dodgerblue" }} onClick={toggleDropdown}>show modifiers</span> :
            ""}
        </div>
      </div>
      <div className="resultContainer">
        <div className="resultsContainerTitle">Random Character Passcode</div>
        <div className="result">
          <PasswordDisplay />
        </div>
      </div>
    </div>
  );
}
