import { useState, useEffect } from 'react'
import { unstructuredParser } from '../assets/passwordParser.tsx'
import Box from '@mui/materialui/Box'
import Typography from '@mui/materialui/Typography'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import ModificationSwitch from './ModificationSwitch.tsx'
import Clipboard from 'react-clipboard.js'

export default function RandomPassword() {
  const [minLength, maxLength] = [15, 35];
  const [password, setPassword] = useState([]);
  const [passwordLength, setPasswordLength] = useState(20)
  const [useColor, setUseColor] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useMixedCase, setUseMixedCase] = useState(true);

  // Arrays filled with potentially available characters
  const characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const symbols = ["+", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "?"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  // Title Component
  const Title = () => {
    return <h2>Random Password:</h2>
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
  function passwordGenerator() {
    let result = [];
    for (let i = 0; i < passwordLength; i++) {
      result.push(randomLetterGenerator(theList))
    }
    setPassword(result);
  }

  // Parses the password state variable into a 
  // a list of decorated HTML elements.
  const passwordList = unstructuredParser(password, useColor);

  // Turns the password useState object (which exists as a list) into a string
  const passwordWord = password.join("")

  // Component: Displays the parsed password
  const PasswordDisplay = () => {
    return <span className="passwords">{passwordList}</span>
  }

  // Component: Returns user selected password length
  const DisplayLength = () => {
    return <p>Password Length: {passwordLength}</p>
  }

  // Takes the value of the slider and modifies the passwordLength value
  const handleSliderChange = (event, newValue) => {
    setPasswordLength(newValue);
  };

  // Component: Button that runs the password generator
  const Button = () => {
    return <button onClick={passwordGenerator}>Make Password</button>
  }

  // Generates a password on page load
  useEffect(() => {
    passwordGenerator();
  }, [passwordLength, useSymbols, useNumbers, useMixedCase]);

  return (
    <>
      <br />
      <Title />
      <PasswordDisplay />
      <DisplayLength />
      <br />
      <br />
      <Clipboard data-clipboard-text={passwordWord}>Copy to Clipboard</Clipboard>
      <Button />
        <Slider
          value={passwordLength}
          onChange={handleSliderChange}
          aria-label="Number Of Words"
          defaultValue={passwordLength}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={minLength}
          max={maxLength}
        />
      <ModificationSwitch title={"Use Numbers"} setState={setUseNumbers} state={useNumbers} />
      <ModificationSwitch title={"Use Symbols"} setState={setUseSymbols} state={useSymbols} />
      <ModificationSwitch title={"Use Mixed Case"} setState={setUseMixedCase} state={useMixedCase} />
      <ModificationSwitch title={"Colorize Result"} setState={setUseColor} state={useColor} />
    </>
  )
}
