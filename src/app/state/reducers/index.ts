import { createReducer, MetaReducer, on } from '@ngrx/store';
import { Friend } from 'src/app/models/friend';
import { environment } from '../../../environments/environment';
import * as friendsActions from '../actions/friends.actions';

export const FRIEND_STATE_KEY = 'friends';
export interface State {
  allFriends: Friend[];
}

export const initialState: State = {
  allFriends: [],
};

export const friendReducer = createReducer(
  initialState,
  on(friendsActions.loadFriendsSuccess, (state, { friends }) => ({
    ...state,
    allFriends: friends,
  })),
  on(friendsActions.addFriendSuccess, (state, { friend }) => ({
    ...state,
    allFriends: [...state.allFriends, friend],
  })),
  on(friendsActions.removeFriendSuccess, (state, { id }) => ({
    ...state,
    allFriends: state.allFriends
      .filter((friend) => friend.id !== id)
      .map((friend) => ({
        ...friend,
        friendIds: friend.friendIds?.filter((fId: string) => fId !== id) ?? [],
      })),
  }))
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
