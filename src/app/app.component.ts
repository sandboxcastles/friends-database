import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, mergeMap, take } from 'rxjs';
import { FriendEntryFormComponent } from './components/friend-entry-form/friend-entry-form.component';
import { Friend } from './models/friend';
import { ModalService } from './services/modal.service';
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

  constructor(
    private store: Store<State>,
    private modalService: ModalService
  ) {}

  addFriend(): void {
    this.allFriends$
      .pipe(
        take(1),
        mergeMap((friends) =>
          this.modalService.open(FriendEntryFormComponent, {
            width: '500px',
            data: { friends },
          })
        ),
        filter((friend: any) => !!friend)
      )
      .subscribe((friend: Partial<Friend>) => {
        this.store.dispatch(fromFriendsActions.addFriend({ friend }));
      });
  }
}
