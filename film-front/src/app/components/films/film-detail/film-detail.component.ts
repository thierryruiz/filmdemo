import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../../../services/film.service';
import { Film } from '../../../models/film.model';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Director } from '../../../models/director.model';
import { Actor } from '../../../models/actor.model';
import { ModelHelper } from '../../../shared/model.helper';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
  }

  protected film: Film;

  protected actors: Actor[];

  protected directors: Director[];

  ngOnInit() {
    console.log('FilmDetailComponent on init') ;
    // get the film id from route params and load it
    this.route.paramMap.subscribe( params => {
      const id: string  = params.get( 'id' );
      if (!id) {
        console.error('Expecting id request param');
        return ;
      }
      this.filmService.getById(id)
        .subscribe( gotFilm => {
          this.film = gotFilm;
          forkJoin( [
            this.filmService.getActors( this.film ),
            this.filmService.getDirectors(this.film)
          ]).subscribe( res => {
              this.actors = res[0],
              this.directors = res[1];
          });
        });
    });
  }

  delete() {
    this.filmService.delete(this.film).subscribe( res => {
      this.snackBar.open('Le film \'' + this.film.title + '\' a été suprimé', null, {
        duration: 3000
      });
      this.router.navigate(['']);
    });
  }
}
