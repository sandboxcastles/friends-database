import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Friend } from 'src/app/models/friend';
import * as fromFriendsActions from 'src/app/state/actions/friends.actions';
import { State } from 'src/app/state/reducers';
import * as fromFriendsSelectors from 'src/app/state/selectors/friends.selectors';

@Component({
  selector: 'mfdb-chart-viewer',
  templateUrl: './chart-viewer.component.html',
  styleUrls: ['./chart-viewer.component.scss'],
})
export class ChartViewerComponent {
  friends$ = this.store.pipe(select(fromFriendsSelectors.getAllFriends));
  title = 'Chart Viewer';
  chosenChartType = 'friendsByAge';
  chartTypes = [
    {
      title: 'Friends By Age',
      value: 'friendsByAge',
    },
    {
      title: 'Friends By Weight',
      value: 'friendsByWeight',
    },
  ];

  public getFriendName = (f: Friend) => f.name;
  public getFriendAge = (f: Friend) => f.age;
  public getFriendWeight = (f: Friend) => f.weight;

  constructor(private store: Store<State>) {}

  addFriend(friend: Partial<Friend>): void {
    this.store.dispatch(fromFriendsActions.addFriend({ friend }));
  }

  removeFriend(id: string): void {
    this.store.dispatch(fromFriendsActions.removeFriend({ id }));
  }

  changeChartType(chartType: string): void {
    this.chosenChartType = chartType;
  }
}
