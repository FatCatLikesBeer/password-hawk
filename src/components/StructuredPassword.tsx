import { useState, useEffect, useRef } from 'react'
import { structuredParser } from '../assets/passwordParser.tsx'
import ModificationSwitch from './ModificationSwitch.tsx'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Clipboard from 'react-clipboard.js'
import generateSymbol from '../assets/symbolGenerator.tsx'
import generateWord from '../assets/wordGenerator.tsx'
import generateNumber from '../assets/numberGenerator.tsx'
import generateCombo from '../assets/comboGenerator.tsx'

// Structured Password Component
export default function StructuredPassword() {
  const [password, setPassword] = useState(["2", "place", "-", "3", "HOLDER"]);
  const [numberOfWords, setNumberOfWord] = useState(5);
  const [useSymbols, setUseSymbols] = useState("-");
  const [useNumbers, setUseNumbers] = useState(true);
  const [useMixed, setUseMixed] = useState(true);
  const [useColor, setUseColor] = useState(true);

  //--------------- Main Password Generator Function ----------------- //
  const generateAndSet = () => {
    let result = [];
    let symbol = "";
    switch (useSymbols) {
      case "random":
        symbol = generateSymbol();
        break;
      case "none":
        symbol = "";
        break;
      default:
        symbol = `${useSymbols}`;
    }
    const includeNumber = useNumbers ? generateNumber : ()=>{return "";};
    // Return a random int from 4 to 8 (both inclusive)
    function randomValue() {
      const result = Math.floor(Math.random() * 5) + 4;
      return result;
    }
    // Return a bool, 50-50 odds
    function randomBool() {
      let result = Math.random() > 0.5 ? true : false;
      result = useMixed ? result : true;
      return result;
    }
    // Add initial word to passphrase
    result.push(includeNumber());
    result.push(generateWord(randomValue(), randomBool()));
    // Add more words based on numberOfWords
    for (let i = 1; i < numberOfWords; i++) {
      result.push(symbol);
      result.push(includeNumber());
      result.push(generateWord(randomValue(), randomBool()));
    }
    setPassword(result);
  }

  // Parses the password state variable into a
  // a list of decorated HTML elements.
  const passwordWord = password.join("")
  const passwordList = structuredParser(password, useColor);

  // The button component that calls the generator
  const GeneratorButton = () => {
    return (
      <>
        <button onClick={generateAndSet}>Make Password</button>
      </>
    );
  }

  // Takes the value of the slider and modifies the numberOfWords value
  const handleSliderChange = (event, newValue) => {
    setNumberOfWord(newValue);
  };

  // Changes the symbol based on selection
  const handleSymbolChange = (event) => {
    setUseSymbols(event.target.value);
  };

  // Run generator on page load
  useEffect(() => {
    generateAndSet();
  }, [useSymbols, useNumbers, useMixed, numberOfWords]);

  return (
    <>
      <h2>Structured Password:</h2>
      <Box sx={{ width: 700, textAlign: "center"}}>
        <Box sx={{ width: 500, textAlign: "left" }}>
          <span className="passwords" id="password" style={{ color: "grey !important" }}>{passwordList}</span>
        </Box>
        <Box sx={{ width: 230, textAlign: "left" }}>
          <GeneratorButton />
          <Clipboard data-clipboard-text={passwordWord}>Copy to Clipboard</Clipboard>
          <p style={{ textAlign: "left" }}>Number of Words: {numberOfWords}</p>
          <Slider
            track={false}
            value={numberOfWords}
            onChange={handleSliderChange}
            aria-label="Number Of Words"
            defaultValue={numberOfWords}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={3}
            max={15}
          />
          <FormControl sx={{ width: 170 }}>
            <InputLabel id="select-symbol-label">Symbol</InputLabel>
            <Select
              labelId="select-symbol-label"
              id="select-symbol"
              value={useSymbols}
              label="Symbol"
              onChange={handleSymbolChange}
            >
              <MenuItem value={"-"}>-</MenuItem>
              <MenuItem value={"_"}>_</MenuItem>
              <MenuItem value={"+"}>+</MenuItem>
              <MenuItem value={"&"}>&</MenuItem>
              <MenuItem value={"!"}>!</MenuItem>
              <MenuItem value={"#"}>#</MenuItem>
              <MenuItem value={"$"}>$</MenuItem>
              <MenuItem value={"^"}>^</MenuItem>
              <MenuItem value={"|"}>|</MenuItem>
              <MenuItem value={"@"}>@</MenuItem>
              <MenuItem value={"random"}>Random Symbol</MenuItem>
              <MenuItem value={"none"}>No Symbol</MenuItem>
            </Select>
          </FormControl>
          <ModificationSwitch title={"Use Numbers"} setState={setUseNumbers} state={useNumbers} />
          <ModificationSwitch title={"Use Mixed Case"} setState={setUseMixed} state={useMixed} />
          <ModificationSwitch title={"Colorize Result"} setState={setUseColor} state={useColor} />
        </Box>
      </Box>
    </>
  )
}
