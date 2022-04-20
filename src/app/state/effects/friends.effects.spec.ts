import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { Friend } from 'src/app/models/friend';
import {
  FriendsDataService,
  IFriendsDataService,
} from 'src/app/services/friends-data.service';
import * as fromFriendsActions from '../actions/friends.actions';
import { initialState, State } from '../reducers';
import { FriendsEffects } from './friends.effects';

class MockFriendsDataService implements IFriendsDataService {
  loadFriends(): Observable<Friend[]> {
    return of([]);
  }

  addFriend(friend: Partial<Friend>): Observable<Friend | null> {
    return of({
      ...friend,
    });
  }

  updateFriend(id: string, friend: Partial<Friend>): Observable<Friend | null> {
    return friend?.id === id
      ? of({
          ...friend,
        })
      : of(null);
  }

  removeFriend(id: string): Observable<{ id: string; success: boolean }> {
    return of({
      id,
      success: true,
    });
  }
}

describe('FriendsEffects', () => {
  let actions$: Observable<any>;
  let effects: FriendsEffects;
  let store: MockStore<State>;
  let friendsDataService: IFriendsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FriendsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: FriendsDataService, useClass: MockFriendsDataService },
      ],
    });

    effects = TestBed.inject(FriendsEffects);
    store = TestBed.inject(MockStore);
    friendsDataService = TestBed.inject(FriendsDataService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should add friend', (done) => {
    const testFriend = { id: '100', name: 'Testy' };
    const spy = spyOn(friendsDataService, 'addFriend').and.callThrough();
    actions$ = of(fromFriendsActions.addFriend({ friend: testFriend }));
    effects.addFriend$.subscribe((res) => {
      expect(res).toEqual(
        fromFriendsActions.addFriendSuccess({
          friend: { id: '100', name: 'Testy' },
        })
      );
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should remove friend', (done) => {
    const spy = spyOn(friendsDataService, 'removeFriend').and.callThrough();
    actions$ = of(fromFriendsActions.removeFriend({ id: '100' }));
    effects.removeFriend$.subscribe((res) => {
      expect(res).toEqual(
        fromFriendsActions.removeFriendSuccess({ id: '100' })
      );
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
