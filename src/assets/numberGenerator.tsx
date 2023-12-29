function generateNumber() {
  let result: number;
  result = Math.floor(Math.random() * 10)
  result = <span className="int">{result}</span>

  return result
}

export default generateNumber;
