import { State } from '../reducers';
import * as fromFriendsSelectors from '../selectors/friends.selectors';

describe('Friends Selectors', () => {
  const initialState: State = {
    friends: {
      allFriends: [
        {
          id: '1',
          name: 'Term Cerllerns',
          age: 39,
          weight: 294,
          friendIds: [],
        },
      ],
    },
  };

  it('should get all friends', () => {
    const result = fromFriendsSelectors.getAllFriends.projector(initialState);
    expect(result.length).toEqual(initialState.friends.allFriends.length);
  });
});
