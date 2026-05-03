import { type CardColorKey } from './colors';

export interface HomeCard {
  name: string;
  color: CardColorKey;
  emoji: string;
  displayOrder: number;
  subText: string;
  ageGroup: [number, number];
  route?: string;
}

const HOME_CARDS: HomeCard[] = [
  {
    name: 'Feeding',
    color: 'mint',
    emoji: 'babybottle',
    displayOrder: 1,
    subText: 'Logs & schedules',
    ageGroup: [0, 2],
  },
  {
    name: 'Sleep',
    color: 'lavender',
    emoji: 'sleep',
    displayOrder: 2,
    subText: 'Naps & bedtime',
    ageGroup: [0, 3],
  },
  {
    name: 'Development',
    color: 'butter',
    emoji: 'development',
    displayOrder: 3,
    subText: 'Milestones & growth',
    ageGroup: [0, 10],
  },
  {
    name: 'Health',
    color: 'rose',
    emoji: 'wellbeing',
    displayOrder: 4,
    subText: 'Visits & vaccines',
    ageGroup: [0, 10],
  },
  {
    name: 'Learning',
    color: 'sky',
    emoji: 'learning',
    displayOrder: 5,
    subText: 'Activities & play',
    ageGroup: [1, 10],
    route: '/(app)/learning',
  },
  {
    name: 'Safety',
    color: 'peach',
    emoji: 'safety',
    displayOrder: 6,
    subText: 'Tips & checklists',
    ageGroup: [0, 10],
  },
];

export default HOME_CARDS;
