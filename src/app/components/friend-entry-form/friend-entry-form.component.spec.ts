import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendEntryFormComponent } from './friend-entry-form.component';

describe('FriendEntryFormComponent', () => {
  let component: FriendEntryFormComponent;
  let fixture: ComponentFixture<FriendEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendEntryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
