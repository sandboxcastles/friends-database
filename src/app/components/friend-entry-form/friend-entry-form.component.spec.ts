import { FormBuilder } from '@angular/forms';
import { getFriendEntryForm } from './friend-entry-form.component';

describe('FriendEntryFormComponent', () => {
  let formBuilder: FormBuilder;
  beforeEach(() => {
    formBuilder = new FormBuilder();
  });
  it('should create friend entry form', () => {
    const friendEntryForm = getFriendEntryForm(formBuilder);
    expect(friendEntryForm.get('name')).toBeDefined();
  });
});
