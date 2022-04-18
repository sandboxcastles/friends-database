import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Friend } from 'src/app/models/friend';

@Component({
  selector: 'mfdb-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent {
  @Input() friends: Friend[] = [];
  @Output() friendRemoved: EventEmitter<string> = new EventEmitter();

  removeFriend(id?: string): void {
    if (id) {
      this.friendRemoved.emit(id);
    }
  }
}
