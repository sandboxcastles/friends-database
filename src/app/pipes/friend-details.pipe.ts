import { Pipe, PipeTransform } from '@angular/core';
import { Friend } from '../models/friend';

@Pipe({
  name: 'friendDetails',
})
export class FriendDetailsPipe implements PipeTransform {
  transform(
    id: string,
    friends: Friend[]
  ): {
    id: string | undefined;
    name: string | undefined;
    age: number | undefined;
    weight: number | undefined;
  } | null {
    const friend = friends.find((f) => f.id === id);
    console.log('friends: ', friends);
    return !!friend
      ? {
          id,
          name: friend?.name,
          age: friend?.age,
          weight: friend?.weight,
        }
      : null;
  }
}
