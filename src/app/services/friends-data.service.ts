import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { friendMockData } from 'src/mock-data/friends.mock-data';
import { v4 as uuid } from 'uuid';
import { Friend } from '../models/friend';

export interface IFriendsDataService {
  loadFriends(): Observable<Friend[]>;
  addFriend(friend: Partial<Friend>): Observable<Friend | null>;
  updateFriend(id: string, friend: Partial<Friend>): Observable<Friend | null>;
  removeFriend(id: string): Observable<{ id: string; success: boolean }>;
}

@Injectable({
  providedIn: 'root',
})
export class FriendsDataService implements IFriendsDataService {
  loadFriends(): Observable<Friend[]> {
    return of(friendMockData);
  }

  addFriend(friend: Partial<Friend>): Observable<Friend | null> {
    const id = uuid();
    return of({
      ...friend,
      id,
    });
  }

  updateFriend(id: string, friend: Partial<Friend>): Observable<Friend | null> {
    const result = friend.id === id ? friend : null;
    return of(result);
  }

  removeFriend(id: string): Observable<{ id: string; success: boolean }> {
    return of({
      id,
      success: true,
    });
  }
}
