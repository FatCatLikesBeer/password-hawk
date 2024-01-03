import { useState, useEffect, useRef } from 'react'
import { structuredParser } from '../assets/passwordParser.tsx'
import ModificationSwitch from './ModificationSwitch.tsx'
import Switch from '@mui/material/Switch'
import Slider from '@mui/material/Slider'
import Clipboard from 'react-clipboard.js'
import generateSymbol from '../assets/symbolGenerator.tsx'
import generateWord from '../assets/wordGenerator.tsx'
import generateNumber from '../assets/numberGenerator.tsx'
import generateCombo from '../assets/comboGenerator.tsx'

// Structured Password Component
export default function StructuredPassword() {
  const [minLength, maxLength] = [3, 25];
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
        <button className="button" onClick={generateAndSet}>Make Password</button>
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
    <div className="mainContainer">
      <div className="options">
        <div className="containerTitle">Options</div>
          <GeneratorButton />
          <Clipboard data-clipboard-text={passwordWord}>Copy to Clipboard</Clipboard>
        <br />
        <br />
        <div>
          <div className="slider">
            Number of Words ↓
            <Slider
              track={false}
              value={numberOfWords}
              onChange={handleSliderChange}
              aria-label="Number Of Words"
              valueLabelDisplay="auto"
              style={{ width: 180 }}
              step={1}
              marks
              min={minLength}
              max={maxLength}
            />
          </div>
          <div className="separator">
            Separator Symbol ↓
            <select
              title="Symbol"
              value={useSymbols}
              onChange={handleSymbolChange}
              style={{ width: 180 }}
            >
              <option value={"-"}>-</option>
              <option value={"_"}>_</option>
              <option value={"+"}>+</option>
              <option value={"&"}>&</option>
              <option value={"!"}>!</option>
              <option value={"#"}>#</option>
              <option value={"$"}>$</option>
              <option value={"^"}>^</option>
              <option value={"|"}>|</option>
              <option value={"@"}>@</option>
              <option value={"random"}>Random Symbol</option>
              <option value={"none"}>No Symbol</option>
            </select>
          </div>
        <ModificationSwitch title={"Use Numbers"} setState={setUseNumbers} state={useNumbers} />
        <ModificationSwitch title={"Use Mixed Case"} setState={setUseMixed} state={useMixed} />
        <ModificationSwitch title={"Colorize Result"} setState={setUseColor} state={useColor} />
      </div>
      </div>
      <div className="resultContainer">
        <div className="containerTitle">Result</div>
        <div className="result">
          <span className="passwords" id="password">{passwordList}</span>
        </div>
      </div>
    </div>
  );
}
