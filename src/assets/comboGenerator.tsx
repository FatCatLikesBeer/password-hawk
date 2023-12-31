import generateNumber from './numberGenerator.tsx'
import generateWord from './wordGenerator.tsx'

export default function generateCombo(wordLength, lowerCase) {
  let result = [];
  result.push(generateNumber());
  result.push(generateWord(wordLength, lowerCase))
  return result;
}
