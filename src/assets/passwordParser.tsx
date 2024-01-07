// Parses the password state variable into a 
// a list of decorated HTML elements.

// Makes the following error go away:
// Warning: Each child in a list should have a unique "key" prop.
let key = 0;
const keyMaker = () => {
  key = key + 1;
  return key;
}

// Parser for the main, structured password
export const structuredParser = (source, style) => {
  const noColor = { color: "grey" };
  const colorize = style ? {} : noColor;
  let fullResult = source.map((e) => {
    let result
    if (e.length >= 2) {
      if (e[0] === e[0].toUpperCase()) {
        result = <span className="upper" style={colorize} key={keyMaker()}>{e}</span>
      } else {
        result = <span className="lower" style={colorize} key={keyMaker()}>{e}</span>
      }
    } else if (!isNaN(Number(e))) {
      result = <span className="int" style={colorize} key={keyMaker()}>{e}</span>
    } else {
      result = <span className="symbol" style={colorize} key={keyMaker(0)}>{e}</span>
    }
    return result
  })
  return fullResult;
}

// Parser for the secondary, randomized password
export const unstructuredParser = (source, style) => {
  const noColor = { color: "grey" };
  const colorize = style ? {} : noColor;
  let fullResult = source.map((e) => {
  function isLetterOrSymbol(char) {
    return /^[a-zA-Z]$/.test(char);
  }
  let result;
  if (isLetterOrSymbol(e)) {
    if (e[0] === e[0].toUpperCase()) {
      result = <span className="upper" style={colorize} key={keyMaker(0)}>{e}</span>;
    } else {
      result = <span className="lower" style={colorize} key={keyMaker(0)}>{e}</span>;
    }
  } else if (!isNaN(Number(e))) {
    result = <span className="int" style={colorize} key={keyMaker(0)}>{e}</span>;
  } else {
    result = <span className="symbol" style={colorize} key={keyMaker(0)}>{e}</span>;
  };
  return result;
});
return fullResult;
}

// I'm not sure why I ended up with 2 different functions
// but whatever, they're working fine.
