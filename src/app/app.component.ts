import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Friend } from './models/friend';
import * as fromFriendsActions from './state/actions/friends.actions';
import { State } from './state/reducers';
import * as fromFriendsSelectors from './state/selectors/friends.selectors';

@Component({
  selector: 'mfdb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  allFriends$ = this.store.pipe(select(fromFriendsSelectors.getAllFriends));
  title = 'My Friends Database';

  constructor(private store: Store<State>) {}

  addFriend(friend: Partial<Friend>): void {
    this.store.dispatch(fromFriendsActions.addFriend({ friend }));
  }

  removeFriend(id: string): void {
    this.store.dispatch(fromFriendsActions.removeFriend({ id }));
  }
}
