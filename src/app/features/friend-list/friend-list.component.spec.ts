import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { State } from 'src/app/state/reducers';
import { FriendListComponent } from './friend-list.component';

describe('FriendListComponent', () => {
  let component: FriendListComponent;
  let fixture: ComponentFixture<FriendListComponent>;
  let store: MockStore;
  const initialState: State = { friends: { allFriends: [] } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forChild([]), MaterialModule],
      declarations: [FriendListComponent],
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(FriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
