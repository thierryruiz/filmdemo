import { Component, OnInit } from '@angular/core';
import { Actor } from '../../../models/actor.model';
import { Film } from '../../../models/film.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../../../services/actor.service';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private actorService: ActorService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  protected actor: Actor;

  protected films: Film[];


  ngOnInit() {
    console.log('ActorDetailComponent on init');
    // get the actor id from route params and load actor
    this.route.paramMap.subscribe(params => {
      const id: string = params.get('id');
      if (!id) {
        console.error('Expecting id request param');
        return;
      }
      this.actorService.getById(id)
        .subscribe(gotActor => {
          this.actor = gotActor;
          this.actorService.getFilms(this.actor).subscribe( films => {
            this.films = films;
          });
        });
    });
  }

  delete() {
    this.actorService.delete(this.actor).subscribe(res => {
      this.snackBar.open('L\'acteur/actrice \'' + this.actor.firstName + ' ' + this.actor.lastName +  '\' a été suprimé(e)', null, {
        duration: 3000
      });
      this.router.navigate(['']);
    });
  }

}
