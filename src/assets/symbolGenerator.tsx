function generateSymbol(any: any) {
  let result: string;
  const options: array = ["=", "+", "-", "_", "!", "#", "$", "^", "&", "|", "@"];
  const ceiling: number = options.length;
  const selector: number = Math.floor(Math.random() * ceiling)
  result = options[selector];

  result = <span className="symbol">{result}</span>
  return result
}

export default generateSymbol;
