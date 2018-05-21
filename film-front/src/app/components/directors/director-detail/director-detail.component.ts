import { Component, OnInit } from '@angular/core';
import { Director } from '../../../models/director.model';
import { Film } from '../../../models/film.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectorService } from '../../../services/director.service';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrls: ['./director-detail.component.css']
})
export class DirectorDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private directorService: DirectorService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  protected director: Director;

  protected films: Film[];


  ngOnInit() {
    console.log('DirectorDetailComponent on init');
    // get the director id from route params and load director
    this.route.paramMap.subscribe(params => {
      const id: string = params.get('id');
      if (!id) {
        console.error('Expecting id request param');
        return;
      }
      this.directorService.getById(id)
        .subscribe(res => {
          this.director = res;
          this.directorService.getFilms(this.director).subscribe(films => {
            this.films = films;
          });
        });
    });
  }

  delete() {
    this.directorService.delete(this.director).subscribe(res => {
      this.snackBar.open('Le réalisateur \'' + this.director.firstName + ' ' + this.director.lastName + '\' a été suprimé', null, {
        duration: 3000
      });
      this.router.navigate(['']);
    });
  }
}
