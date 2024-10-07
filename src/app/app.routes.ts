import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { ExploreComponent } from './app/explore/explore.component';
import { FindYourVoyageComponent } from './app/find-your-voyage/find-your-voyage.component';
import { AskComponent } from './app/ask/ask.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'find-your-voyage', component: FindYourVoyageComponent },
  { path: 'ask', component: AskComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' }  // Catch-all route
];
