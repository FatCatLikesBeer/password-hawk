import { useState, useEffect } from 'react'
import { unstructuredParser } from '../assets/passwordParser.tsx'
import ModificationSwitch from './ModificationSwitch.tsx'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import generateSymbol from '../assets/symbolGenerator.tsx'
import generateWord from '../assets/wordGenerator.tsx'
import generateNumber from '../assets/numberGenerator.tsx'
import generateCombo from '../assets/comboGenerator.tsx'

// Structured Password Component
export default function StructuredPassword() {
  const [password, setPassword] = useState(["2", "place", "-", "3", "HOLDER"]);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useMixed, setUseMixed] = useState(true);

  // Generates a password and set it to state
  const generateAndSet = () => {
    let result = [];
    let symbol = generateSymbol();
    result.push(generateNumber());
    result.push(generateWord(4, true));
    result.push(symbol);
    result.push(generateNumber());
    result.push(generateWord(5, false));
    result.push(symbol);
    result.push(generateNumber());
    result.push(generateWord(6, true));
    result.push(symbol);
    result.push(generateCombo(8, false));
    setPassword(result);
  }

  // Run generator on load
  useEffect(() => {
    generateAndSet()
  }, []);

  // Parses the password state variable into a 
  // a list of decorated HTML elements.
  const passwordList = unstructuredParser(password);
  const passwordWord = password.join("")

  // The button that calls the generator
  const GeneratorButton = () => {
    return (
      <>
        <button onClick={generateAndSet}>Make Password</button>
      </>
    )
  }

  return (
    <>
      <h2>Structured Password:</h2>
      <span className="passwords" id="password">{passwordList}</span>
      <p>Password Length: {passwordWord.length}</p>
      <br />
      <br />
      <GeneratorButton />
      <ModificationSwitch title={"Symbols"} setState={setUseSymbols} state={useSymbols} />
      <ModificationSwitch title={"Numbers"} setState={setUseNumbers} state={useNumbers} />
      <ModificationSwitch title={"Upper Case"} setState={setUseMixed} state={useMixed} />
    </>
  )
}
