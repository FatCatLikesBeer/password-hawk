import generateWord from './assets/wordGenerator.tsx'
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css'

function App() {
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

  const lchars = <span className="lower">goodbye</span>;
  const ints = <span className="int">123987</span>;
  const symbols = <span className="symbol">_+)</span>;
  const uchars = <span className="upper">HELLO</span>;
  const newPasswordsList = fouxPasswordsAsList.push(<li className='password' key="nothing">{lchars}{ints}{symbols}{uchars}</li>);

  const test1: string = generateWord(Math.floor(Math.random() * 6) + 2, false);
  const test2: string = generateWord(Math.floor(Math.random() * 6) + 2, true);

  return (
    <>
      {test1}
      <br />
      {test2}
      <br />
      <Header />
      <div className="card">
        <ul className="passwords">
          {fouxPasswordsAsList}
        </ul>
      </div>
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
