import * as fromFriendsActions from './friends.actions';

describe('loadFriends', () => {
  it('should return an action', () => {
    expect(fromFriendsActions.loadFriends().type).toBe(
      '[Friends] Load Friends'
    );
  });
  it('should return empty friends', () => {
    expect(
      fromFriendsActions.loadFriendsSuccess({ friends: [] }).friends
    ).toEqual([]);
  });
  it('should return an error', () => {
    expect(
      fromFriendsActions.loadFriendsFailure({ error: { bad: true } }).error
    ).toEqual({ bad: true });
  });
});
