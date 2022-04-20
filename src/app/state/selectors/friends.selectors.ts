import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Friend } from 'src/app/models/friend';
import { State } from '../reducers';

export const friendsFeatureKey = 'friends';

export const selectFriendsFeature =
  createFeatureSelector<State>(friendsFeatureKey);

export const getAllFriends = createSelector(
  selectFriendsFeature,
  (state) => state.friends.allFriends as Friend[]
);
