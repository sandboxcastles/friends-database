import { createReducer, MetaReducer, on } from '@ngrx/store';
import { Friend } from 'src/app/models/friend';
import { environment } from '../../../environments/environment';
import * as friendsActions from '../actions/friends.actions';

export const FRIEND_STATE_KEY = 'friends';
export interface State {
  friends: {
    allFriends: Friend[];
  };
}

export const initialState: State = {
  friends: {
    allFriends: [],
  },
};

export const friendReducer = createReducer(
  initialState,
  on(friendsActions.loadFriendsSuccess, (state, { friends }) => ({
    ...state,
    friends: {
      ...state.friends,
      allFriends: friends,
    },
    allFriends: friends,
  })),
  on(friendsActions.addFriendSuccess, (state, { friend }) => ({
    ...state,
    friends: {
      ...state.friends,
      allFriends: [...state.friends.allFriends, friend],
    },
  })),
  on(friendsActions.removeFriendSuccess, (state, { id }) => ({
    ...state,
    friends: {
      allFriends: state.friends.allFriends
        .filter((friend) => friend.id !== id)
        .map((friend) => ({
          ...friend,
          friendIds:
            friend.friendIds?.filter((fId: string) => fId !== id) ?? [],
        })),
    },
  }))
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
