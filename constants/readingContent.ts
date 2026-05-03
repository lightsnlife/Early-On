// Each Q&A entry is a 3-element tuple: [question, answer, answerType]
// answerType mirrors FlashCardItem: 'text' displays the answer, 'audio' treats answer as a URI.
export type QnATuple = [questionLine1: string, questionLine2: string | null, answer: string, answerType: 'text' | 'audio'];

export interface ReadingContent {
  level: number;
  ordered: boolean;
  qna: QnATuple[];
}

const READING_CONTENT: ReadingContent[] = [
  {
    level: 1,
    ordered: false,
    qna: [
      ['What letter is this?', 'A', 'The letter A', 'text'],
      ['What letter is this?', 'B', 'The letter B', 'text'],
      ['What letter is this?', 'C', 'The letter C', 'text'],
      ['What letter is this?', 'D', 'The letter D', 'text'],
      ['What letter is this?', 'E', 'The letter E', 'text'],
      ['What letter is this?', 'F', 'The letter F', 'text'],
      ['What letter is this?', 'G', 'The letter G', 'text'],
      ['What letter is this?', 'H', 'The letter H', 'text'],
      ['What letter is this?', 'I', 'The letter I', 'text'],
      ['What letter is this?', 'J', 'The letter J', 'text'],
      ['What letter is this?', 'K', 'The letter K', 'text'],
      ['What letter is this?', 'L', 'The letter L', 'text'],
      ['What letter is this?', 'M', 'The letter M', 'text'],
      ['What letter is this?', 'N', 'The letter N', 'text'],
      ['What letter is this?', 'O', 'The letter O', 'text'],
      ['What letter is this?', 'P', 'The letter P', 'text'],
      ['What letter is this?', 'Q', 'The letter Q', 'text'],
      ['What letter is this?', 'R', 'The letter R', 'text'],
      ['What letter is this?', 'S', 'The letter S', 'text'],
      ['What letter is this?', 'T', 'The letter T', 'text'],
      ['What letter is this?', 'U', 'The letter U', 'text'],
      ['What letter is this?', 'V', 'The letter V', 'text'],
      ['What letter is this?', 'W', 'The letter W', 'text'],
      ['What letter is this?', 'X', 'The letter X', 'text'],
      ['What letter is this?', 'Y', 'The letter Y', 'text'],
      ['What letter is this?', 'Z', 'The letter Z', 'text'],
    ],
  },
  // {
  //   level: 2,
  //   ordered: false,
  //   qna: [
  //     ['What word does C-A-T spell?', 'cat', 'text'],
  //     ['What word does D-O-G spell?', 'dog', 'text'],
  //     ['What word does S-U-N spell?', 'sun', 'text'],
  //     ['What word does H-A-T spell?', 'hat', 'text'],
  //     ['What word does B-I-G spell?', 'big', 'text'],
  //   ],
  // },
  // {
  //   level: 3,
  //   ordered: false,
  //   qna: [
  //     ['The cat sat on the ___', 'mat', 'text'],
  //     ['The dog ran to the ___', 'park', 'text'],
  //     ['She reads a ___ every night', 'book', 'text'],
  //     ['The sun shines in the ___', 'sky', 'text'],
  //     ['He put on his ___ and went outside', 'hat', 'text'],
  //   ],
  // },
];

export default READING_CONTENT;
