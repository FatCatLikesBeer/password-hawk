import four from '../assets/4_letter_words.tsx'
import five from '../assets/5_letter_words.tsx'
import six from '../assets/6_letter_words.tsx'
import seven from '../assets/7_letter_words.tsx'
import eight from '../assets/8_letter_words.tsx'

// This accepts an array, generates a random value based on the
// lenght of the array, and returns a random element from that array.
const randomizer = (source: string[]) => {
  const ceiling = source.length;
  const randomValue = Math.floor(Math.random() * ceiling);
  return source[randomValue];
}

// This accepts a length and a case, then returns a formatted word,
// based on the length and the case formatting.
const generateWord = (length: number, lowercase: boolean) => {
  let source: string[] = eight;
  let result: string;

  switch (length) {
    case 4:
      source = four;
      break;
    case 5:
      source = five;
      break;
    case 6:
      source = six;
      break;
    case 7:
      source = seven;
      break;
    case 8:
      source = eight;
      break;
    default:
      source = four;
      break;
  }

  lowercase ?
    result = randomizer(source).toLowerCase()
    :
    result = randomizer(source)

  return result;
}

export default generateWord;
