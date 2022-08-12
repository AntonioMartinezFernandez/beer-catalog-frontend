import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BeersComponent } from './components/beers/beers.component';
import { BeerDetailsComponent } from './components/beer-details/beer-details.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'beers',
    pathMatch: 'full',
  },
  { path: 'beers', component: BeersComponent, canActivate: [AuthGuard] },
  { path: 'beer/:id', component: BeerDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
