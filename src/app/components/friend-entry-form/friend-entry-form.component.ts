import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Friend } from 'src/app/models/friend';

@Component({
  selector: 'mfdb-friend-entry-form',
  templateUrl: './friend-entry-form.component.html',
  styleUrls: ['./friend-entry-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendEntryFormComponent {
  readonly MIN_WEIGHT = 0;
  readonly MAX_WEIGHT = 2000;
  readonly MIN_AGE = 0;
  readonly MAX_AGE = 200;
  @Input() allFriends: Friend[] = [];
  @Output() friendAdded: EventEmitter<Partial<Friend>> = new EventEmitter();
  formBuilder = new FormBuilder();

  form: FormGroup = this.createForm();

  allFriendsForm!: FormArray;

  ngOnChanges(sc: SimpleChanges): void {
    if (sc['allFriends']) {
      this.allFriendsForm = this.createAllFriendsFormArray(
        sc['allFriends'].currentValue
      );
    }
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      id: null,
      name: [null, Validators.required],
      age: [
        null,
        [
          Validators.required,
          Validators.min(this.MIN_AGE),
          Validators.max(this.MAX_AGE),
        ],
      ],
      weight: [
        null,
        [
          Validators.required,
          Validators.min(this.MIN_WEIGHT),
          Validators.max(this.MAX_WEIGHT),
        ],
      ],
      friendIds: this.formBuilder.array([]),
    });
  }

  createAllFriendsFormArray(friends: Friend[]): FormArray {
    return this.formBuilder.array(
      friends?.map((f) => this.formBuilder.control(f)) ?? []
    );
  }

  addFriend(): void {
    this.friendAdded.emit(this.form.value);
    this.form = this.createForm();
    this.allFriendsForm = this.createAllFriendsFormArray(this.allFriends);
  }

  updateLinkedFriends({ checked }: { checked: boolean }, id: string): void {
    const friendIds = this.form.get('friendIds') as FormArray;
    const controlIndex = friendIds.controls.findIndex(
      (fId) => fId.value === id
    );
    if (checked) {
      if (controlIndex === -1) {
        friendIds.push(this.formBuilder.control(id));
      }
    } else if (controlIndex > -1) {
      friendIds.removeAt(controlIndex);
    }
  }
}
