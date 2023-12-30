import { useState, useEffect } from 'react'

export default function RandomPassword() {
  const [minLength, maxLength] = [15, 35];
  const [password, setPassword] = useState([]);
  const [passwordLength, setPasswordLength] = useState(minLength)

  // List of characters
  const characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "?"]

  // Title
  const Title = () => {
    return <h2>Random Password:</h2>
  }

  // Password Generator
  const passwordGenerator = () => {
    const preResult = () => {
      const selector = Math.floor(Math.random() * characters.length);
      return characters[selector];
    }
    const result = Math.random() > .5 ? preResult().toUpperCase() : preResult()
    return result;
  }

  // Button Function Logic
  function onClick() {
    let result = [];
    for (let i = 0; i < passwordLength; i++) {
      result.push(passwordGenerator())
    }
    setPassword(result);
  }

  useEffect(() => {
    onClick();
  }, []);

  // Button Object
  const Button = () => {
    return <button onClick={onClick}>Make Password</button>
  }

  // Parses the password state variable into a 
  // a list of decorated HTML elements.
  const passwordList = password.map((e) => {
    function isLetterOrSymbol(char) {
      return /^[a-zA-Z]$/.test(char);
    }
    let result;
    if (isLetterOrSymbol(e)) {
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

  const PasswordDisplay = () => {
    return <span className="passwords">{passwordList}</span>
  }

  // Return Password length
  const DisplayLength = () => {
    return <p>Password Length: {passwordLength}</p>
  }

  // Password Length Buttons
  const LengthButtons = () => {
    const makeLonger = () => {
      if (passwordLength < maxLength) {
        let result = passwordLength;
        setPasswordLength(result + 1)
        onClick();
      }
    }
    const makeShorter = () => {
      if (passwordLength > minLength) {
        let result = passwordLength;
        setPasswordLength(result - 1);
        onClick();
      }
    }

    return (
      <>
        <br />
        <button onClick={makeShorter}>Shorten</button>
        <button onClick={makeLonger}>Lengthen</button>
      </>
    );
  }

  return (
    <>
      <br />
      <Title />
      <br />
      <PasswordDisplay />
      <DisplayLength />
      <br />
      <br />
      <Button />
      <LengthButtons />
    </>
  )
}
