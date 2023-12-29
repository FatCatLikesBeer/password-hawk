import { useState, useEffect } from 'react'
import generateSymbol from './assets/symbolGenerator.tsx'
import generateWord from './assets/wordGenerator.tsx'
import generateNumber from './assets/numberGenerator.tsx'
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css'

function App() {
  const [passwordLength, setPasswordLength] = useState(20);
  const [passwordCase, setPasswordCase] = useState("mixed");
  const [passwordSymbol, setPasswordSymbol] = useState(null);
  const [password, setPassword] = useState(["2", "place", "-", "3", "HOLDER"]);

  const Header = () => {
    return (<h1>Password Hawk</h1>);
  }

  const fouxPasswordsAsArray = [
    "2vite-3react-6SPEAKER",
    "8jqJ8!jl)--Lu8sSeRffe"
  ];

  const fouxPasswordsAsList = fouxPasswordsAsArray.map((e) => {
    return <li className="password" key={e}>{e}</li>
  });

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

  // The button that calls the generator
  const GeneratorButton = () => {
    return (
      <>
        <button onClick={generateAndSet}>Make Password</button>
      </>
    )
  }

  // Parses the password state variable into a 
  // a list of decorated HTML elements.
  const passwordList = password.map((e) => {
    let result;
    if (e.length >= 2) {
      if (e[0] === e[0].toUpperCase()) {
        result = <span className="upper">{e}</span>;
      } else {
        result = <span className="lower">{e}</span>;
      }
    } else if (!isNaN(Number(e))) {
      result = <span className="int">{e}</span>;
    } else {
      result = <span className="symbol">{e}</span>;
    };
    return result;
  });

  return (
    <>
      <br />
      <Header />
      <div className="card">
        <ul className="passwords">
          {fouxPasswordsAsList}
        </ul>
      </div>
      <span className="passwords" id="password">{passwordList}</span>
      <br />
      <br />
      <GeneratorButton />
      <div style={{ textAlign: "left" }}>
        <h2>Tips for good passwords</h2>
        <p>
          Longer passwords are better.
        </p>
        <p>
          Should contain all the four character types: <span className="upper">uppercase</span>, <span className="lower">lowercase</span>, <span className="int">numerals</span>, <span className="symbol">symbols</span>.
        </p>
        <br />
        <br />
        <br />
        <p className="read-the-docs">
          This app was inspired by <a target="blank" href="https://www.passwordwolf.com">Password Wolf</a> and motivated by:
        </p>
        <ul className="read-the-docs" style={{ textAlign: "left" }}>
          <li>A need for a portfolio piece</li>
          <li>A desire to excercise React</li>
          <li>A desire to learn TypeScript</li>
          <li>A desire to build things</li>
        </ul>
      </div>
    </>
  )
}

export default App
