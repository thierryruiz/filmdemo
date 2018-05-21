import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatButtonModule, MatInputModule, MatSnackBarModule, MatDialog} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FilmEditComponent } from './components/films/film-edit/film-edit.component';
import { FilmListComponent } from './components/films/film-list/film-list.component';
import { FilmService } from './services/film.service';
import { ActorService } from './services/actor.service';
import { DirectorService } from './services/director.service';
import { SearchService } from './services/search.service';
import { ActorListComponent } from './components/actors/actor-list/actor-list.component';
import { DirectorListComponent } from './components/directors/director-list/director-list.component';
import { DirectorEditComponent } from './components/directors/director-edit/director-edit.component';
import { ActorEditComponent } from './components/actors/actor-edit/actor-edit.component';
import { ItemComponent } from './components/shared/item/item.component';
import { FilmDetailComponent } from './components/films/film-detail/film-detail.component';
import { ModelHelper } from './shared/model.helper';
import { AddItemComponent } from './components/shared/add-item/add-item.component';
import { LoginComponent } from './components/login/login/login.component';
import { AuthService } from './services/auth.service';
import { ActorDetailComponent } from './components/actors/actor-detail/actor-detail.component';
import { DirectorDetailComponent } from './components/directors/director-detail/director-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilmEditComponent,
    FilmListComponent,
    ActorListComponent,
    DirectorListComponent,
    DirectorEditComponent,
    ActorEditComponent,
    ItemComponent,
    FilmDetailComponent,
    AddItemComponent,
    LoginComponent,
    ActorDetailComponent,
    DirectorDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    FilmService,
    ActorService,
    DirectorService,
    SearchService,
    ModelHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
