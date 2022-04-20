import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mfdb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() addFriend: EventEmitter<void> = new EventEmitter();
  routes: any[] = [
    { path: ['/'], text: 'Home' },
    { path: ['/', 'friend-list'], text: 'Friends List' },
    { path: ['/', 'charts'], text: 'Charts' },
  ];
}
