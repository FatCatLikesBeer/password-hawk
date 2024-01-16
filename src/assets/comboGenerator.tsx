import generateNumber from './numberGenerator.tsx'
import generateWord from './wordGenerator.tsx'

export default function generateCombo(wordLength: number, lowerCase: boolean) {
  let result: string[] = [];
  result.push(generateNumber());
  result.push(generateWord(wordLength, lowerCase));
  const resultAsString: string = result.join("");
  return resultAsString;
}
