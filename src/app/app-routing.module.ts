import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-from/user-from.component';

const routes: Routes = [
  { path: 'add-workout', component: UserFormComponent },
  { path: 'view-workouts', component: UserListComponent },
  { path: '', redirectTo: '/add-workout', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
