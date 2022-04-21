import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Friend } from 'src/app/models/friend';

export interface FriendEntryFormData {
  friend?: Friend;
  friends: Friend[];
}

@Component({
  selector: 'mfdb-friend-entry-form',
  templateUrl: './friend-entry-form.component.html',
  styleUrls: ['./friend-entry-form.component.scss'],
})
export class FriendEntryFormComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  formBuilder = new FormBuilder();

  entryForm: FormGroup = getFriendEntryForm(this.formBuilder);

  friendsListForm!: FormArray;

  constructor(
    public dialogRef: MatDialogRef<FriendEntryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FriendEntryFormData
  ) {}

  ngOnInit(): void {
    this.resetForms();
  }

  resetForms(): void {
    this.entryForm.reset();
    const friend: any = this.data.friend;
    if (!!friend) {
      ['id', 'name', 'age', 'weight'].forEach((key) => {
        this.entryForm.get(key)?.setValue(friend[key]);
      });
    }
    Object.keys(this.entryForm.controls).forEach((key) => {
      this.entryForm.get(key)?.setErrors(null);
    });

    this.friendsListForm = createAllFriendsFormArray(
      this.data.friends,
      this.formBuilder,
      friend
    );
    this.nameInput?.nativeElement.focus();
  }

  addFriend(): void {
    this.dialogRef.close({
      ...this.entryForm.value,
      friendIds: getCheckedFriendIds(this.friendsListForm),
    });
  }

  public cancelForm(): void {
    this.dialogRef.close(null);
  }
}

export function getFriendEntryForm(
  formBuilder: FormBuilder,
  minAge = 0,
  maxAge = 200,
  minWeight = 0,
  maxWeight = 2000
): FormGroup {
  return formBuilder.group({
    id: null,
    name: [null, Validators.required],
    age: [
      null,
      [Validators.required, Validators.min(minAge), Validators.max(maxAge)],
    ],
    weight: [
      null,
      [
        Validators.required,
        Validators.min(minWeight),
        Validators.max(maxWeight),
      ],
    ],
    friendIds: formBuilder.array([]),
  });
}

export function getCheckedFriendIds(friendsListForm: FormArray): string[] {
  return friendsListForm.controls
    .filter((c) => c.value.checked)
    .map((c) => c.value.id);
}

export function createAllFriendsFormArray(
  friends: Friend[],
  formBuilder: FormBuilder,
  friend?: Friend
): FormArray {
  return formBuilder.array(
    friends?.map((f) =>
      formBuilder.group({
        id: [f.id],
        name: [f.name],
        checked: [friend?.friendIds?.some((fId) => fId === f.id) ?? false],
      })
    ) ?? []
  );
}
