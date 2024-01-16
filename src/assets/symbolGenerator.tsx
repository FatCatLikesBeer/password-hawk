function generateSymbol() {
  let result: string;
  const options: string[] = ["=", "+", "-", "_", "!", "#", "$", "^", "&", "|", "@"];
  const ceiling: number = options.length;
  const selector: number = Math.floor(Math.random() * ceiling)
  result = options[selector];

  return result
}

export default generateSymbol;
