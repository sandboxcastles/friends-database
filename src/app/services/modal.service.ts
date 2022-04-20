import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  open<T>(
    component: ComponentType<T>,
    config?: MatDialogConfig<any> | undefined
  ): Observable<any> {
    const dialogRef = this.dialog.open(component, config);
    return dialogRef.afterClosed();
  }
}
