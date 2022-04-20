import {
  AfterViewInit,
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
  friends: Friend[];
}

@Component({
  selector: 'mfdb-friend-entry-form',
  templateUrl: './friend-entry-form.component.html',
  styleUrls: ['./friend-entry-form.component.scss'],
})
export class FriendEntryFormComponent implements OnInit, AfterViewInit {
  readonly MIN_WEIGHT = 0;
  readonly MAX_WEIGHT = 2000;
  readonly MIN_AGE = 0;
  readonly MAX_AGE = 200;
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  formBuilder = new FormBuilder();

  entryForm: FormGroup = this.createForm();

  friendsListForm!: FormArray;

  constructor(
    public dialogRef: MatDialogRef<FriendEntryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FriendEntryFormData
  ) {}

  ngOnInit(): void {
    this.resetForms();
  }

  ngAfterViewInit(): void {
    this.nameInput?.nativeElement.focus();
  }

  resetForms(): void {
    this.entryForm.reset();
    Object.keys(this.entryForm.controls).forEach((key) => {
      this.entryForm.get(key)?.setErrors(null);
    });

    this.friendsListForm = this.createAllFriendsFormArray(this.data.friends);
  }

  addFriend(): void {
    const friendIds = this.friendsListForm.controls
      .filter((c) => c.value.checked)
      .map((c) => c.value.id);
    this.dialogRef.close({
      ...this.entryForm.value,
      friendIds,
    });
  }

  public cancelForm(): void {
    this.dialogRef.close(null);
  }

  private createForm(): FormGroup {
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

  private createAllFriendsFormArray(friends: Friend[]): FormArray {
    return this.formBuilder.array(
      friends?.map((f) =>
        this.formBuilder.group({
          id: [f.id],
          name: [f.name],
          checked: [false],
        })
      ) ?? []
    );
  }
}
