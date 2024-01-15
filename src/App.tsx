import { useState, useEffect } from 'react'
import Switch from '@mui/material/Switch'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StructuredPassword from './components/StructuredPassword.tsx'
import RandomPassword from './components/RandomPassword'
import Footer from './components/Footer.tsx'
import Tips from './components/Tips.tsx'
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
    window.addEventListener('resize', handleResize);

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

  // Toggle between main components using the 't' key
  const Shortcut = () => {
    useEffect(() => {
      const handleKeydown = (event) => {
        if (event.key === 't') { setChecked(!checked); }
      }
      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('keydown', handleKeydown);
      }
    });
  }

  return (
    <>
      {!isDropdownNeeded && <Shortcut />}
      <Tips />
      <Header />
      <Toggle />
      <MainComponent />
      <br />
      <div id="copy">
        <h2>Why You Can Trust Password Hawk</h2>
        <p>We never log or store any of the passwords generated.</p>
        <p>Even if we did log generated passwords, we have no idea who you are, or where you would use the results.</p>
        <p>If you're technically inclined, you can verify these claims by checking the spaghetti code <a href="https://www.github.com/FatCatLikesBeer/password-hawk" target="_blank">GitHub</a>.</p>
        <h2>What Makes a Good Password*</h2>
        <p>The full story of password security is very complex and would require a lengthy conversation to get you caught up to speed. If you're intrested in that lengthy conversation, skip this section and check out the <i>Resources on Password Security</i> below. They are very indepth, so if you would like a shallow survey of what makes a good password in laymen's terms, go ahead and keep reading. </p>
        <p>The best way to know what makes a good password is to know what makes a password bad. There are two main ways you can have a bad password: using passwords that can be easily guessed by a machine; and using a password that hackers already have.</p>
        <p>A password guessing machine will have a harder time guessing your password if your password is long and/or complex. As of today, January 2024, we at Password Hawk believe it is better to provide long passwords — in the form of <i>passphrases</i> — becasue they're strong, easy to type, and easy to remember. Passphrases strike a balance between convenience and strength.</p>
        <p>Hackers have been storing passwords for decades. Whenever a website gets compromised, that site's passwords get stored and shared between other hacker groups. You can view a list the <a href="https://en.wikipedia.org/wiki/Wikipedia:10,000_most_common_passwords" target="_blank">10,000</a>, <a href="https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10-million-password-list-top-100000.txt" target="_blank">100,000</a>, and <a href="https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt" target="_blank">1,000,000</a> most common passwords. A good password will be long, reasonably complex, and <b>not</b> on any of these lists. Using a password generator will almost guarentee a unique password that's not on these lists.</p>
        <h2>Resources on Password Security</h2>
        <p><a href="https://www.passwordmonster.com" target="_blank">Password Monster</a>: Password strength tester</p>
        <p><a href="https://passwordbits.com/dictionary-words-weaken-passwords/" target="_blank">Password Bits article</a>: Does Adding Dictionary Words to Passwords Weaken Them? (spoiler, no, as long as you do it the way Password Hawk does it).</p>
        <p><a href="https://xkcd.com/936/" target="_blank">xkdc Password Strength</a>: longer passphrases are easier to remember and harder to crack than shorter, more complex passcodes.</p>
        <p><a href="https://youtu.be/vf37jh3dV2I?si=CuL3eEJsOvD0l32g" target="_blank">zxcvbn</a>: zxcvbn is a fast, lightweight, open-source password analysis tool created by Daniel Lowe Wheeler at Dropbox. This video goes over the different password attack styles, and considers those styles when calcualting password strength.</p>
        <h2>Why This Site Exists</h2>
        <p>I recently completed a course on ReactJS and wanted to build something worth sharing.</p>
        <p>I was also inspired by <a href="https://www.passwordwolf.com" target="_blank">Password Wolf</a>. That site was made by <a href="https://twitter.com/JackRhysider/status/1494704527655817220" target="_blank">Jack Rhysider</a>, a cybersecurity professional, and the creator of the amazing podcast <a href="https://darknetdiaries.com/" target="_blank">Darknet Diaries</a>.</p>
        <p>There are plenty of password generator sites and apps, but I thought I could do better by lessening the burden of options and putting generating & copying straight to the front! I even made keyboard shortcuts :)</p>
      </div>
      <Footer />
    </>
  )
}

export default App
