import { Friend } from '../models/friend';
import { FriendDetailsPipe } from './friend-details.pipe';

describe('FriendDetailsPipe', () => {
  const friends: Friend[] = [
    {
      id: '1',
      name: 'Roy',
    },
    {
      id: '2',
      name: 'Moss',
    },
    {
      id: '3',
      name: 'Jen',
    },
  ];
  it('create an instance', () => {
    const pipe = new FriendDetailsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null', () => {
    const pipe = new FriendDetailsPipe();
    const friends: Friend[] = [];
    const res = pipe.transform('1', friends);
    expect(res).toBeNull();
  });

  it('should have name of Moss', () => {
    const pipe = new FriendDetailsPipe();
    const res = pipe.transform('2', friends)?.name;
    expect(res).toBe('Moss');
  });

  it('should not find a friend', () => {
    const pipe = new FriendDetailsPipe();
    const res = pipe.transform('4', friends);
    expect(res).toBeNull();
  });
});
