import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mfdb-site-nav',
  templateUrl: './site-nav.component.html',
  styleUrls: ['./site-nav.component.scss'],
})
export class SiteNavComponent {
  @Output() addFriend: EventEmitter<void> = new EventEmitter();
  routes: any[] = [
    { path: ['/'], title: 'Home' },
    { path: ['/', 'friend-list'], title: 'Friends List' },
    { path: ['/', 'charts'], title: 'Charts' },
  ];
}
