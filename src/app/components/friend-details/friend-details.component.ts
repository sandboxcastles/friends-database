import { Component, Input } from '@angular/core';
import { Friend } from 'src/app/models/friend';

@Component({
  selector: 'mfdb-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.scss'],
})
export class FriendDetailsComponent {
  @Input() friends: Friend[] = [];
  @Input() friend!: Friend;
}
