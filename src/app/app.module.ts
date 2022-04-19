import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FriendDetailsComponent } from './components/friend-details/friend-details.component';
import { FriendEntryFormComponent } from './components/friend-entry-form/friend-entry-form.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { MaterialModule } from './material/material.module';
import { FriendDetailsPipe } from './pipes/friend-details.pipe';
import { FriendsEffects } from './state/effects/friends.effects';
import { friendReducer } from './state/reducers';

@NgModule({
  declarations: [
    AppComponent,
    FriendEntryFormComponent,
    FriendDetailsComponent,
    FriendListComponent,
    FriendDetailsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forRoot({ friends: friendReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([FriendsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
