import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { FriendEntryFormComponent } from 'src/app/components/friend-entry-form/friend-entry-form.component';
import { Friend } from 'src/app/models/friend';
import { ModalService } from 'src/app/services/modal.service';
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
  displayedColumns = ['name', 'age', 'weight', 'friendCount', 'edit'];

  constructor(
    private store: Store<State>,
    private modalService: ModalService
  ) {}

  addFriend(friend: Partial<Friend>): void {
    this.store.dispatch(fromFriendsActions.addFriend({ friend }));
  }

  editFriend(friend: Friend, friends: Friend[]): void {
    this.modalService
      .open(FriendEntryFormComponent, {
        data: {
          friend,
          friends: friends.filter((f) => f.id !== friend.id),
        },
      })
      .pipe(filter((friend) => !!friend))
      .subscribe((updatedFriend) => {
        console.log(updatedFriend);
        if (updatedFriend.id) {
          this.store.dispatch(
            fromFriendsActions.updateFriend({
              id: friend.id as string,
              friend: updatedFriend,
            })
          );
        }
      });
  }

  removeFriend(id: string): void {
    this.store.dispatch(fromFriendsActions.removeFriend({ id }));
  }
}
