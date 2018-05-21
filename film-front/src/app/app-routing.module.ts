import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmEditComponent } from './components/films/film-edit/film-edit.component';
import { HomeComponent } from './components/home/home.component';
import { FilmDetailComponent } from './components/films/film-detail/film-detail.component';
import { LoginComponent } from './components/login/login/login.component';
import { ActorEditComponent } from './components/actors/actor-edit/actor-edit.component';
import { ActorDetailComponent } from './components/actors/actor-detail/actor-detail.component';
import { DirectorDetailComponent } from './components/directors/director-detail/director-detail.component';
import { DirectorEditComponent } from './components/directors/director-edit/director-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'film/detail/:id',
    component: FilmDetailComponent
  },
  {
    path: 'film/create',
    component: FilmEditComponent
  },
  {
    path: 'film/edit/:id',
    component: FilmEditComponent
  },
  {
    path: 'actor/detail/:id',
    component: ActorDetailComponent
  },
  {
    path: 'actor/create',
    component: ActorEditComponent
  },
  {
    path: 'actor/edit/:id',
    component: ActorEditComponent
  },
  {
    path: 'director/detail/:id',
    component: DirectorDetailComponent
  },
  {
    path: 'director/create',
    component: DirectorEditComponent
  },
  {
    path: 'director/edit/:id',
    component: DirectorEditComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
