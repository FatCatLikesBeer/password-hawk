import { useState, useEffect } from 'react'
import { structuredParser } from '../assets/passwordParser.tsx'
import generateSymbol from '../assets/symbolGenerator.tsx'
import generateWord from '../assets/wordGenerator.tsx'
import generateNumber from '../assets/numberGenerator.tsx'

// Structured Password Component
export default function StructuredPassword() {
  const [password, setPassword] = useState(["2", "place", "-", "3", "HOLDER"]);

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
    setPassword(result);
  }

  // Run generator on load
  useEffect(() => {
    generateAndSet()
  }, []);

  // Parses the password state variable into a 
  // a list of decorated HTML elements.
  const passwordList = structuredParser(password);
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
    </>
  )
}
