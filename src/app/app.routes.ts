import { Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppLoginSignupComponent } from './app-login-signup/app-login-signup.component';
import { ExploreComponent } from './home/explore/explore.component';
import { AppFindYourVoyageComponent } from './app-find-your-voyage/app-find-your-voyage.component';
import { AppHelpComponent } from './app-help/app-help.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppHomeComponent },
  { path: 'login-signup', component: AppLoginSignupComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'find-your-voyage', component: AppFindYourVoyageComponent },
  { path: 'help', component: AppHelpComponent }
];
