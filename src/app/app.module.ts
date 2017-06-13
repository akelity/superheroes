import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import {FirebaseService} from './services/firebase.service';
import {FlashMessagesModule} from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { superheroesComponent } from './components/superheroes/superheroes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { superheroComponent } from './components/superhero/superhero.component';
import { AddsuperheroComponent } from './components/add-superhero/add-superhero.component';
import { EditsuperheroComponent } from './components/edit-superhero/edit-superhero.component';

export const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'superheroes', component:superheroesComponent},
  {path:'superhero/:id', component:superheroComponent},
  {path: 'add-superhero', component:AddsuperheroComponent},
  {path:'edit-superhero/:id', component:EditsuperheroComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    superheroesComponent,
    NavbarComponent,
    superheroComponent,
    AddsuperheroComponent,
    EditsuperheroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
