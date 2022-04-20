import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'charts',
    loadChildren: () =>
      import('src/app/features/chart-viewer/chart-viewer.module').then(
        (m) => m.ChartViewerModule
      ),
  },
  {
    path: 'friend-list',
    loadChildren: () =>
      import('src/app/features/friend-list/friend-list.module').then(
        (m) => m.FriendListModule
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
