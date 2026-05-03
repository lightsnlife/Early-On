import { type CardColorKey } from './colors';

export interface LearningCard {
  name: string;
  subText: string;
  color: CardColorKey;
  emoji: string;
  ageGroup: [number, number];
  levels: number[];
  tags: string[];
}

const LEARNING_CARDS: LearningCard[] = [
  {
    name: 'Alphabets and Reading',
    subText: 'Letters, sounds & first words',
    color: 'sky',
    emoji: 'learning',
    ageGroup: [2, 6],
    levels: [1, 2, 3],
    tags: ['Language', 'Reading', 'Phonics'],
  },
  {
    name: 'Numbers & Counting',
    subText: 'Counting, patterns & early maths',
    color: 'butter',
    emoji: 'numbers',
    ageGroup: [2, 7],
    levels: [1, 2, 3],
    tags: ['Maths', 'Counting', 'Patterns'],
  },
  {
    name: 'Colors & Shapes',
    subText: 'Recognising colours and basic shapes',
    color: 'rose',
    emoji: 'palette',
    ageGroup: [1, 4],
    levels: [1, 2],
    tags: ['Visual', 'Colours', 'Shapes'],
  },
  {
    name: 'Puzzles & Logic',
    subText: 'Problem solving and critical thinking',
    color: 'mint',
    emoji: 'puzzle',
    ageGroup: [3, 8],
    levels: [1, 2, 3, 4],
    tags: ['Logic', 'Problem Solving', 'Cognitive'],
  },
  {
    name: 'Nature & Science',
    subText: 'Exploring the world around us',
    color: 'mint',
    emoji: 'development',
    ageGroup: [5, 10],
    levels: [1, 2, 3],
    tags: ['Science', 'Nature', 'Curiosity'],
  },
];

export default LEARNING_CARDS;
