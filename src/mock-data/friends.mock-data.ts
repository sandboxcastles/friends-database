import { Friend } from 'src/app/models/friend';

export const friendMockData: Friend[] = [
  {
    id: '1',
    name: 'Nick',
    age: 39,
    weight: 399,
    friendIds: ['2'],
  },
  {
    id: '2',
    name: 'Steve',
    age: 30,
    weight: 175,
    friendIds: [],
  },
];
