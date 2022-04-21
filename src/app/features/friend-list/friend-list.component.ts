import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Friend } from 'src/app/models/friend';
import * as fromFriendsActions from 'src/app/state/actions/friends.actions';
import { State } from 'src/app/state/reducers';
import * as fromFriendsSelectors from 'src/app/state/selectors/friends.selectors';

@Component({
  selector: 'mfdb-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent {
  friends$ = this.store.pipe(select(fromFriendsSelectors.getAllFriends));
  displayedColumns = ['name', 'age', 'weight', 'friendCount', 'delete'];

  constructor(private store: Store<State>) {}

  addFriend(friend: Partial<Friend>): void {
    this.store.dispatch(fromFriendsActions.addFriend({ friend }));
  }

  removeFriend(id: string): void {
    this.store.dispatch(fromFriendsActions.removeFriend({ id }));
  }
}
