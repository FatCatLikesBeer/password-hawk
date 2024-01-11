import { useState, useEffect } from 'react'
import Switch from '@mui/material/Switch'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StructuredPassword from './components/StructuredPassword.tsx'
import RandomPassword from './components/RandomPassword'
import Footer from './components/Footer.tsx'
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
          name="main_toggle"
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
        <h2>Why You Can Trust Password Hawk</h2>
        <p>We never log or store any of the passwords generated.</p>
        <p>Even if we did we have no idea who you are, or where you would use our results.</p>
        <p>If you're technically inclined, you can verify these claims by checking our source code <a href="https://www.github.com/FatCatLikesBeer/password-hawk" target="_blank">GitHub</a>.</p>
        <h2>Resources on Password Security</h2>
        <p><a href="https://www.passwordmonster.com" target="_blank">Password Monster</a>: Test your password strength.</p>
        <p><a href="https://passwordbits.com/dictionary-words-weaken-passwords/" target="_blank">Password Bits article</a>: Does Adding Dictionary Words to Passwords Weaken Them? (spoiler, no, as long as you do it the way Password Hawk does it).</p>
        <p><a href="https://xkcd.com/936/" target="_blank">xkdc Password Strength</a>: longer passphrases are easier to remember and harder to crack than shorter, more complex passcodes.</p>
        <p></p>
        <br />
        <br />
        <p className="ps">
          This app was inspired by <a target="blank" href="https://www.passwordwolf.com">Password Wolf</a> and motivated by:
        </p>
        <ul className="ps">
          <li>I recently completed a course on reactjs and wanted to keep making stuff</li>
        </ul>
      </div>
      <Footer />
    </>
  )
}

export default App
