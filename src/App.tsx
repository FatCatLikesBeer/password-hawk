import { useState, useEffect } from 'react'
import Switch from '@mui/material/Switch'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StructuredPassword from './components/StructuredPassword.tsx'
import RandomPassword from './components/RandomPassword'
import './App.css'

function App() {
  const [passwordLength, setPasswordLength] = useState(20);
  const [passwordCase, setPasswordCase] = useState("mixed");
  const [passwordSymbol, setPasswordSymbol] = useState(null);
  const [checked, setChecked] = useState(true);
  
  // Header
  const Header = () => {
    return (<h1 style={{paddingBottom: 15}}>Password Hawk</h1>);
  }

  // Toggle between Structured and Unstructured Password Generator
  const Toggle = () => {
    const toggleLogic = () => {
      setChecked(!checked);
    }
    return (
      <div style={{ paddingBottom: 20 }}>
        Random Password
        <Switch
          checked={checked}
          onChange={toggleLogic}
          size="large"
        />
        Structured Passphrase
      </div>
    );
  }

  // Main Password Component
  const MainComponent = () => { return <> {checked ? <StructuredPassword /> : <RandomPassword />} </> }

  return (
    <>
      <Header />
      <Toggle />
      <MainComponent />
      <br />
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
        <p className="copy">
          This app was inspired by <a target="blank" href="https://www.passwordwolf.com">Password Wolf</a> and motivated by:
        </p>
        <ul className="copy" style={{ textAlign: "left" }}>
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
