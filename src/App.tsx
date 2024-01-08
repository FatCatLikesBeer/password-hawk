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

  const Header = () => {
    return <h1 style={{paddingBottom: 15}}>Password Hawk</h1>;
  }

  const Toggle = () => {
    const toggleLogic = () => {
      setChecked(!checked);
    }
    return (
      <div id="mainToggle" style={{ paddingBottom: 10 }}>
        {!isDropdownNeeded ? "Random Character Passcode" : "Random Passcode"}
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
  const MainComponent = () => {
    return <>
      {checked ? <StructuredPassword isDropdownNeeded={isDropdownNeeded} /> : <RandomPassword isDropdownNeeded={isDropdownNeeded} />}
    </>
  }

  return (
    <>
      <Header />
      <Toggle />
      <MainComponent />
      <br />
      <div id="copy">
        <h2>Difference between <b>passcode</b> and <b>passphrase</b></h2>
        <p><b>Passcode: </b>a string of characters comprised of numbers, symbols, and mix cased letters.</p>
        <p><b>Passphrase: </b>a string of words, separated by a symbol. Passphrases are easier to read, remember, and type. We append a number to each word to increase the strength of each passcode.</p>
        <h2>Why you can trust Password Hawk</h2>
        <p>We never log or store any of the passwords generated.</p>
        <p>Even if we did we have no idea who you are, or where you would use our results.</p>
        <p>Check out the source code over at <a href="https://www.github.com/FatCatLikesBeer/password-hawk" target="_blank">GitHub</a>.</p>
        <br />
        <br />
        <p id="ps">
          This app was inspired by <a target="blank" href="https://www.passwordwolf.com">Password Wolf</a> and motivated by:
        </p>
        <ul id="ps"style={{ textAlign: "left" }}>
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
