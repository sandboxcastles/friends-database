import { Friend } from 'src/app/models/friend';
import * as fromFriendsActions from '../actions/friends.actions';
import * as fromFriendReducer from './index';
describe('Reducer: Friends', () => {
  let initialState: fromFriendReducer.State;
  const mockFriend1: Friend = {
    id: '1',
    name: 'Softy',
    age: 142,
    weight: 299,
    friendIds: [],
  };
  const mockFriend2: Friend = {
    id: '2',
    name: 'Terst',
    age: 100,
    weight: 150,
    friendIds: ['1'],
  };

  beforeEach(() => {
    initialState = {
      friends: {
        allFriends: [mockFriend1],
      },
    };
  });

  it('should have 0 base entries', () => {
    const expected = { friends: { allFriends: [] } };
    const action = fromFriendsActions.loadFriends();
    expect(fromFriendReducer.friendReducer(undefined, action)).toEqual(
      expected
    );
  });

  it('should load 2 friends', () => {
    const action = fromFriendsActions.loadFriendsSuccess({
      friends: [mockFriend1, mockFriend2],
    });
    expect(
      fromFriendReducer.friendReducer(undefined, action).friends.allFriends
        .length
    ).toEqual(2);
  });

  it('should add a friend', () => {
    expect(
      fromFriendReducer.friendReducer(
        initialState,
        fromFriendsActions.addFriendSuccess({ friend: mockFriend2 })
      )
    ).toEqual({ friends: { allFriends: [mockFriend1, mockFriend2] } });
  });

  it('should remove first friend', () => {
    const newInitialState = {
      ...initialState,
      friends: {
        ...initialState.friends,
        allFriends: [...initialState.friends.allFriends, mockFriend2],
      },
    };
    expect(
      fromFriendReducer.friendReducer(
        newInitialState,
        fromFriendsActions.removeFriendSuccess({ id: '1' })
      ).friends.allFriends[0].id
    ).toEqual('2');
  });
});
