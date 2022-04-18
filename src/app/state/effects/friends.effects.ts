import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { Friend } from 'src/app/models/friend';
import { FriendsDataService } from 'src/app/services/friends-data.service';
import * as fromFriendsActions from '../actions/friends.actions';

@Injectable()
export class FriendsEffects implements OnInitEffects {
  loadFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFriendsActions.loadFriends),
      switchMap(() => this.friendsDataService.loadFriends()),
      map((friends: Friend[]) =>
        fromFriendsActions.loadFriendsSuccess({ friends })
      )
    )
  );

  addFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFriendsActions.addFriend),
      switchMap((action) => this.friendsDataService.addFriend(action.friend)),
      map((friend: Friend) =>
        friend
          ? fromFriendsActions.addFriendSuccess({ friend })
          : fromFriendsActions.addFriendFailure({ error: 'friend not created' })
      )
    )
  );

  removeFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFriendsActions.removeFriend),
      switchMap((action) => this.friendsDataService.removeFriend(action.id)),
      map(({ id, success }) =>
        success
          ? fromFriendsActions.removeFriendSuccess({ id })
          : fromFriendsActions.removeFriendFailure({
              error: 'friend not removed',
            })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private friendsDataService: FriendsDataService
  ) {}

  ngrxOnInitEffects(): Action {
    return fromFriendsActions.loadFriends();
  }
}
