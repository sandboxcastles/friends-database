import { createAction, props } from '@ngrx/store';
import { Friend } from 'src/app/models/friend';

export const loadFriends = createAction('[Friends] Load Friends');

export const loadFriendsSuccess = createAction(
  '[Friends] Load Friends Success',
  props<{ friends: Friend[] }>()
);

export const loadFriendsFailure = createAction(
  '[Friends] Load Friends Failure',
  props<{ error: any }>()
);

export const addFriend = createAction(
  '[Friends] Add Friend',
  props<{ friend: Partial<Friend> }>()
);

export const addFriendSuccess = createAction(
  '[Friends] Add Friend Success',
  props<{ friend: Friend }>()
);

export const addFriendFailure = createAction(
  '[Friends] Add Friend Failure',
  props<{ error: any }>()
);

export const removeFriend = createAction(
  '[Friends] Remove Friend',
  props<{ id: string }>()
);

export const removeFriendSuccess = createAction(
  '[Friends] Remove Friend Success',
  props<{ id: string }>()
);

export const removeFriendFailure = createAction(
  '[Friends] Remove Friend Failure',
  props<{ error: any }>()
);
