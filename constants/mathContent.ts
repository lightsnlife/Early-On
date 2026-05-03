// Each Q&A entry is a 3-element tuple: [question, answer, answerType]
// answerType mirrors FlashCardItem: 'text' displays the answer, 'audio' treats answer as a URI.
export type MathQnATuple = [question: string, answer: string, answerType: 'text' | 'audio'];

export interface mathContent {
  level: number;
  ordered: boolean;
  qna: MathQnATuple[];
}

const MATH_CONTENT: mathContent[] = [
  {
    level: 1,
    ordered: false,
    qna: [
      ['What letter is this?  A', 'The letter A', 'text'],
      ['What letter is this?  B', 'The letter B', 'text'],
      ['What letter is this?  C', 'The letter C', 'text'],
      ['What letter is this?  D', 'The letter D', 'text'],
      ['What letter is this?  E', 'The letter E', 'text'],
      ['What letter is this?  F', 'The letter A', 'text'],
      ['What letter is this?  G', 'The letter B', 'text'],
      ['What letter is this?  H', 'The letter C', 'text'],
      ['What letter is this?  I', 'The letter D', 'text'],
      ['What letter is this?  J', 'The letter E', 'text'],
      ['What letter is this?  K', 'The letter B', 'text'],
      ['What letter is this?  L', 'The letter C', 'text'],
      ['What letter is this?  M', 'The letter D', 'text'],
      ['What letter is this?  N', 'The letter E', 'text'],
      ['What letter is this?  O', 'The letter A', 'text'],
      ['What letter is this?  P', 'The letter B', 'text'],
      ['What letter is this?  Q', 'The letter C', 'text'],
      ['What letter is this?  R', 'The letter D', 'text'],
      ['What letter is this?  S', 'The letter E', 'text'],
      ['What letter is this?  T', 'The letter B', 'text'],
      ['What letter is this?  U', 'The letter C', 'text'],
      ['What letter is this?  V', 'The letter D', 'text'],
      ['What letter is this?  W', 'The letter E', 'text'],
      ['What letter is this?  X', 'The letter A', 'text'],
      ['What letter is this?  Y', 'The letter B', 'text'],
      ['What letter is this?  Z', 'The letter C', 'text'],
    ],
  },
  {
    level: 2,
    ordered: false,
    qna: [
      ['What word does C-A-T spell?', 'cat', 'text'],
      ['What word does D-O-G spell?', 'dog', 'text'],
      ['What word does S-U-N spell?', 'sun', 'text'],
      ['What word does H-A-T spell?', 'hat', 'text'],
      ['What word does B-I-G spell?', 'big', 'text'],
    ],
  },
  {
    level: 3,
    ordered: false,
    qna: [
      ['The cat sat on the ___', 'mat', 'text'],
      ['The dog ran to the ___', 'park', 'text'],
      ['She reads a ___ every night', 'book', 'text'],
      ['The sun shines in the ___', 'sky', 'text'],
      ['He put on his ___ and went outside', 'hat', 'text'],
    ],
  },
];

export default MATH_CONTENT;
