function generateNumber() {
  let result;
  result = Math.floor(Math.random() * 10).toString()
  return result;
}

export default generateNumber;
