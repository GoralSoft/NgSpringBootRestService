import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PapersComponent } from './components/papers/papers.component';
import { HomeComponent } from './components/home/home.component';
import { StudentsComponent } from './components/students/students.component';

import { FormsModule } from '@angular/forms';

import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {UrlPermission} from './urlPermission/url.permission';

const routes: Routes = [
  /*
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'papers', component: PapersDataComponent },
  { path: 'students', component: StudentsComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },*
  */

  { path: 'profile', component: ProfileComponent ,canActivate: [UrlPermission] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'papers', component: PapersComponent },
  { path: 'students', component: StudentsComponent },
  // otherwise redirect to profile
  { path: '**', redirectTo: '/login' },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), FormsModule ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
