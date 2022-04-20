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

  public getFriendName = (f: Friend) => f.name;
  public getFriendAge = (f: Friend) => f.age;
  public getFriendWeight = (f: Friend) => f.weight;

  constructor(private store: Store<State>) {}

  addNewFriend(): void {
    // Open modal for adding new friend
  }

  addFriend(friend: Partial<Friend>): void {
    this.store.dispatch(fromFriendsActions.addFriend({ friend }));
  }

  removeFriend(id: string): void {
    this.store.dispatch(fromFriendsActions.removeFriend({ id }));
  }
}
