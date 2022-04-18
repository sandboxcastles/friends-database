import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FriendsEffects } from './friends.effects';

describe('FriendsEffects', () => {
  let actions$: Observable<any>;
  let effects: FriendsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FriendsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FriendsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
