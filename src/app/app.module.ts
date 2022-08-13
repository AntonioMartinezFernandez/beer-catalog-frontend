import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignupComponent } from './components/signup/signup.component';
import { BeersComponent } from './components/beers/beers.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './auth.guard';
import { TokenAdapterService } from './services/token-adapter.service';
import { BeerDetailsComponent } from './components/beer-details/beer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    BeersComponent,
    LoginComponent,
    BeerDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutocompleteLibModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenAdapterService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
