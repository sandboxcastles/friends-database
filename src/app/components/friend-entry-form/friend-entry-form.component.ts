import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { asyncScheduler } from 'rxjs';
import { Friend } from 'src/app/models/friend';

@Component({
  selector: 'mfdb-friend-entry-form',
  templateUrl: './friend-entry-form.component.html',
  styleUrls: ['./friend-entry-form.component.scss'],
})
export class FriendEntryFormComponent {
  readonly MIN_WEIGHT = 0;
  readonly MAX_WEIGHT = 2000;
  readonly MIN_AGE = 0;
  readonly MAX_AGE = 200;
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
  @Input() friends: Friend[] = [];
  @Output() friendAdded: EventEmitter<Partial<Friend>> = new EventEmitter();
  formBuilder = new FormBuilder();

  entryForm: FormGroup = this.createForm();

  friendsListForm!: FormArray;

  ngOnChanges(sc: SimpleChanges): void {
    if (sc['friends']) {
      this.resetForms();
    }
  }

  resetForms(): void {
    this.entryForm.reset();
    Object.keys(this.entryForm.controls).forEach((key) => {
      this.entryForm.get(key)?.setErrors(null);
    });

    this.friendsListForm = this.createAllFriendsFormArray(this.friends);
    asyncScheduler.schedule(() => this.nameInput?.nativeElement.focus());
  }

  addFriend(): void {
    const friendIds = this.friendsListForm.controls
      .filter((c) => c.value.checked)
      .map((c) => c.value.id);
    this.friendAdded.emit({
      ...this.entryForm.value,
      friendIds,
    });
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
