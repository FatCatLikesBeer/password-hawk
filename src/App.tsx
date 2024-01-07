import { useState, useEffect } from 'react'
import Switch from '@mui/material/Switch'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StructuredPassword from './components/StructuredPassword.tsx'
import RandomPassword from './components/RandomPassword'
import './App.css'

function App() {
  const [checked, setChecked] = useState(true);
  const [isDropdownNeeded, setIsDropdownNeeded] = useState(window.innerWidth <= 650);

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
      <div id="mainToggle" style={{ paddingBottom: 20 }}>
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

  // Window Resize State function
  const handleResize = () => {
    setIsDropdownNeeded(window.innerWidth <= 650);
  };

  // Call handleResize when window resizes
  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  // Main Password Component
  const MainComponent = () => { return <> {checked ? <StructuredPassword isDropdownNeeded={isDropdownNeeded}/> : <RandomPassword isDropdownNeeded={isDropdownNeeded} />} </> }

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
          Should contain all the four character types: <span style={{  }}><span className="upper">uppercase</span>, <span className="lower">lowercase</span>, <span className="int">numerals</span>, <span className="symbol">symbols</span></span>.
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
