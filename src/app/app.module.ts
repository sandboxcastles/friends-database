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
import { FriendEntryFormComponent } from './components/friend-entry-form/friend-entry-form.component';
import { SiteNavComponent } from './components/site-nav/site-nav.component';
import { MaterialModule } from './material/material.module';
import { FriendsEffects } from './state/effects/friends.effects';
import { friendReducer } from './state/reducers';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FriendEntryFormComponent,
    // FriendDetailsComponent,
    // FriendListComponent,
    // FriendDetailsPipe,
    // BarChartComponent,
    // PieChartComponent,
    SiteNavComponent,
    HomeComponent,
    // ChartViewerComponent,
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
