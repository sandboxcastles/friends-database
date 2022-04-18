import { TestBed } from '@angular/core/testing';
import { FriendsDataService } from './friends-data.service';

describe('FriendsDataServiceService', () => {
  let service: FriendsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
