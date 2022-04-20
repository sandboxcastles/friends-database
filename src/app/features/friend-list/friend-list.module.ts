import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { FriendDetailsPipe } from 'src/app/pipes/friend-details.pipe';
import { FriendDetailsComponent } from './friend-details/friend-details.component';
import { FriendListComponent } from './friend-list.component';

const routes: Routes = [{ path: '', component: FriendListComponent }];

@NgModule({
  declarations: [
    FriendDetailsComponent,
    FriendListComponent,
    FriendDetailsPipe,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class FriendListModule {}
