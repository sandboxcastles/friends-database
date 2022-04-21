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
    friendIds: ['1', '5', '6'],
  },
  {
    id: '3',
    name: 'Gertrude',
    age: 47,
    weight: 155,
    friendIds: [],
  },
  {
    id: '4',
    name: 'Ben',
    age: 49,
    weight: 89,
    friendIds: ['6'],
  },
  {
    id: '5',
    name: 'Lexi',
    age: 83,
    weight: 119,
    friendIds: ['6'],
  },
  {
    id: '6',
    name: 'Gus',
    age: 98,
    weight: 15,
    friendIds: ['1', '4', '7'],
  },
  {
    id: '7',
    name: 'Lindy',
    age: 7,
    weight: 48,
    friendIds: [],
  },
  {
    id: '8',
    name: 'Ken',
    age: 36,
    weight: 168,
    friendIds: ['1'],
  },
  {
    id: '9',
    name: 'Emilia',
    age: 4,
    weight: 45,
    friendIds: ['1', '4', '5', '6', '7'],
  },
  {
    id: '10',
    name: 'Stuart',
    age: 50,
    weight: 162,
    friendIds: ['1', '8'],
  },
];
