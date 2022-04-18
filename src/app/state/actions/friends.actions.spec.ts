import * as fromFriends from './friends.actions';

describe('loadFriends', () => {
  it('should return an action', () => {
    expect(fromFriends.loadFriends().type).toBe('[Friends] Load Friends');
  });
  it('should return empty friends', () => {
    expect(fromFriends.loadFriendsSuccess({ friends: [] }).friends).toEqual([]);
  });
});
